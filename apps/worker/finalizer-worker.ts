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
import pLimit from "p-limit";
import { Profiler } from "./utils/profiler";
import { getBatchBuffers, clearBatchBuffers } from "./utils/finalizer-buffer-cache";

const connection = new IORedis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: null,
});

const limit = pLimit(5);

export const finalizerWorker = new Worker("finalizer", async (job) => {

    const { batchJobId } = job.data

    const [batch_job] = await db.select().from(jobs).where(eq(jobs.id, batchJobId));

    if (batch_job?.status === "completed" && batch_job.zip_s3_url) {
        return;
    }

    const finalizerProfiler = new Profiler({
        worker: "FinalizerWorker",
        operation: "Total Finalizer",
        batchJobId,
    });

    try{
        // 1. Read all completed documents for the batch job
        const dbProfiler = new Profiler({
            worker: "FinalizerWorker",
            operation: "Fetch Documents",
            batchJobId
        });
        const completed_docs = await db.select().from(documents).where(
            and(
                eq(documents.job_id, batchJobId),
                eq(documents.status, "completed")
            )
        )
        dbProfiler.end();

        // 2. Downloads/streams rendered files from S3.
        // const urls = completed_docs.map(doc => doc.s3_url);

        // const valid_urls = urls.filter(
        //     (url): url is string => url !== null
        // )

        // if(valid_urls.length !== urls.length) {
        //     throw new Error("All documents are not uploaded to s3");
        // }

        const downloadProfiler = new Profiler({
            worker: "FinalizerWorker",
            operation: "Download Certificates",
            batchJobId
        });

        const doc_files = await Promise.all(
            completed_docs.map(doc =>
                limit(async () => {

                    if (!doc.s3_url)
                        throw new Error("Doc not finished");

                    const cached = getBatchBuffers(batchJobId)?.get(doc.id);

                    if (cached) {
                        console.log(`CACHE HIT: document ${doc.id} fetched from cache`);
                        return cached;
                    } else {
                        console.log(`CACHE MISS: document ${doc.id} cached`);
                    
                        const buffer = await fetchFileBuffer(
                            doc.s3_url,
                            "FinalizerWorker"
                        );

                        return {
                            name: `${doc.id}.png`,
                            buffer
                        };
                    }
                })
            )
        );
        
        downloadProfiler.end();

        // 3. Creates Zip
        const zipProfiler = new Profiler({
            worker: "FinalizerWorker",
            operation: "Create ZIP",
            batchJobId
        });
        const zip_buffer = await createZip(doc_files)
        zipProfiler.end();

        // 4. Uplaods Zip
        const uploadProfiler = new Profiler({
            worker: "FinalizerWorker",
            operation: "Upload ZIP",
            batchJobId
        });
        const zip_s3_url = await uploadZip(zip_buffer, batchJobId);
        uploadProfiler.end();


        const updateProfiler = new Profiler({
            worker: "FinalizerWorker",
            operation: "Update Batch",
            batchJobId
        });
        await db.update(jobs).set({
            zip_s3_url: zip_s3_url,
            status: "completed",
            completed_at: new Date()
        }).where(eq(jobs.id, batchJobId))
        updateProfiler.end();

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
    } finally {
        clearBatchBuffers(batchJobId);
        finalizerProfiler.end();
    }
}, { connection });