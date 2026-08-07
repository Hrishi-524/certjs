import { Worker } from "bullmq";
import IORedis from "ioredis";
import { db, jobs } from "@certjs/db"
import { eq } from "drizzle-orm";
import crypto from "crypto"

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
   
    if (!batchJob.zip_s3_url) {
        throw new Error("ZIP not available");
    }

    if (batchJob.status !== "completed" || !batchJob.zip_s3_url) {
        throw new Error("Batch job not ready for webhook delivery");
    }

    const payload = {
        event: "job.completed",
        jobId: batchJob.id,
        status: batchJob.status,
        totalCount: batchJob.total_count,
        processedCount: batchJob.processed_count,
        failedCount: batchJob.failed_count,
        zipUrl: batchJob.zip_s3_url,
        completedAt: batchJob.completed_at
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
