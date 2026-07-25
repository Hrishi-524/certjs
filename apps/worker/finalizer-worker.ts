import { Worker } from "bullmq";
import IORedis from "ioredis";
import { db } from "@certjs/db"
import { documents, jobs } from "@certjs/db/schema"
import { and, eq } from "drizzle-orm";
import { createZip } from "./create-zip";
import fetchFileBuffer from "./fetch-file-buffer";
import { uploadZip } from "./upload-zip";
import { enqueueWebhookQueue } from "./webhook-queue";
import "./webhook-worker"

// const connection = new IORedis(process.env.REDIS_URL!, {
//     maxRetriesPerRequest: null,
// });

const connection = new IORedis({
    host: "127.0.0.1",
    port: 6379,
    maxRetriesPerRequest: null,
})

export const finalizerWorker = new Worker("finalizer", async (job) => {

    const { batchJobId } = job.data

    const [batch_job] = await db.select().from(jobs).where(eq(jobs.id, batchJobId));

    if (batch_job?.status === "completed" && batch_job.zip_s3_url) {
        return;
    }

    try{
        // 1. Read all completed documents for the batch job
        const completed_docs = await db.select().from(documents).where(
            and(
                eq(documents.job_id, batchJobId),
                eq(documents.status, "completed")
            )
        )

        // 2. Downloads/streams rendered files from S3.
        const urls = completed_docs.map(doc => doc.s3_url);

        const valid_urls = urls.filter(
            (url): url is string => url !== null
        )

        if(valid_urls.length !== urls.length) {
            throw new Error("All documents are not uploaded to s3");
        }

        const doc_files =  await Promise.all(valid_urls.map(async (document_url) => {
            const buffer = await fetchFileBuffer(document_url)
            const key = document_url.split(".amazonaws.com/")[1];
            const name = key.split("/").pop();

            if (!name) {
                throw new Error("Invalid S3 key");
            }

            return {
                name,
                buffer
            }
        }))

        // 3. Creates Zip
        const zip_buffer = await createZip(doc_files)

        // 4. Uplaods Zip
        const zip_s3_url = await uploadZip(zip_buffer, batchJobId);

        await db.update(jobs).set({
            zip_s3_url: zip_s3_url,
            status: "completed",
            completed_at: new Date()
        }).where(eq(jobs.id, batchJobId))

        await enqueueWebhookQueue(batchJobId);
    } catch(error) {
        console.error(`Finalizer job ${job.id} failed`, error);

        const maxAttempts = job.opts.attempts ?? 1;

        if (job.attemptsMade + 1 >= maxAttempts) {
            await db.update(jobs).set({
                last_error: String(error),
                status: "failed"
            }).where(eq(jobs.id, batchJobId));
        }

        throw error;
    }
}, { connection });