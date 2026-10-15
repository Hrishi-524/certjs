import { Worker } from "bullmq";
import IORedis from "ioredis";
import { db, jobs } from "@certjs/db"
import { eq } from "drizzle-orm";
import crypto from "crypto"
import { storage } from "@certjs/storage";

const connection = new IORedis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: null,
});

export const webhookWorker = new Worker("webhook", async (job) => {
    const { batchJobId } = job.data

    const [batchJob] = await db.select().from(jobs).where(eq(jobs.id, batchJobId));

    if (!batchJob) {
        throw new Error("Batch job not found");
    }

    if (!batchJob.webhook_url) {
        return;
    }
   
    if (!batchJob.zipKey) {
        throw new Error("ZIP not available");
    }

    if (batchJob.status !== "completed" || !batchJob.zipKey) {
        throw new Error("Batch job not ready for webhook delivery");
    }

    const zipUrl = await storage.getSignedUrl(batchJob.zipKey);

    const payload = {
        event: "job.completed",
        jobId: batchJob.id,
        status: batchJob.status,
        totalCount: batchJob.totalCount,
        processedCount: batchJob.processedCount,
        failedCount: batchJob.failedCount,
        zipUrl,
        completedAt: batchJob.completedAt
    };

    const body = JSON.stringify(payload);

    const signature = crypto.createHmac("sha256", batchJob.webhook_secret ?? "").update(body).digest("hex");
    
    const headers = {
        "Content-Type": "application/json",
        "X-Certjs-Signature": signature
    };

    try {
        const response = await fetch(batchJob.webhook_url, {
            method: "POST",
            headers, 
            body
        });
            
        if (!response.ok) {
            throw new Error(`Failed to send webhook: ${response.statusText}`);
        }
    } catch (error) {
        throw error;
    }
}, { connection });
