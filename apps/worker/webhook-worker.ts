import { Worker } from "bullmq";
import IORedis from "ioredis";
import { db, jobs } from "@certjs/db"
import { eq } from "drizzle-orm";
import crypto from "crypto"

const connection = new IORedis({
    host: "127.0.0.1",
    port: 6379,
    maxRetriesPerRequest: null,
});

export const webhookWorker = new Worker("webhook", async (job) => {
    console.log(`Processing webhook job ${job.id} with data:`, job.data);
    const { batchJobId } = job.data

    const [batchJob] = await db.select().from(jobs).where(eq(jobs.id, batchJobId));

    if (!batchJob) {
        throw new Error("Batch job not found");
    }

    if (!batchJob.webhook_url) {
        console.log(`No webhook URL for batch job ${batchJob.id}, skipping webhook delivery.`);
        return;
    }
    console.log(`Sending webhook for batch job ${batchJob.id} to ${batchJob.webhook_url}`);

    if (!batchJob.zip_s3_url) {
        throw new Error("ZIP not available");
    }

    if (batchJob.status !== "completed" || !batchJob.zip_s3_url) {
        console.log(`Batch job ${batchJob.id} is not ready for webhook delivery.`);
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
        console.log(`Sending POST request to ${batchJob.webhook_url} with payload:`, payload);
        const response = await fetch(batchJob.webhook_url, {
            method: "POST",
            headers, 
            body
        });
            
        console.log(await response.text());
        if (!response.ok) {
            throw new Error(`Failed to send webhook: ${response.statusText}`);
        }
            
        console.log(`Webhook sent successfully for job ${batchJob.id}`);
    } catch (error) {
        console.error(`Webhook failed for batch ${batchJob.id}`, error);
        throw error;
    }
}, { connection });
