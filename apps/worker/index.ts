import { Worker } from "bullmq";
import IORedis from "ioredis";
import { renderCertificate } from "@certjs/core/render-engine"
import { documents, jobs, templates, placeholders } from "@certjs/db/schema"
import fetchFileBuffer from "./fetch-file-buffer";
import { db } from "@certjs/db"
import { or, and, eq } from "drizzle-orm";
import { uploadGeneratedCertificate } from "./upload-rendered-document";
import { sql } from "drizzle-orm";
import { enqueueFinalizeQueue } from "./finlaize-queue";
import "./finalizer-worker"
import "./webhook-worker"
import { Profiler } from "./utils/profiler";
import { getTemplate, removeTemplate, setTemplate } from "./utils/template-cache";
import { cacheRenderedCertificate } from "./utils/finalizer-buffer-cache";
// apps/worker/index.ts

// const connection = new IORedis(process.env.REDIS_URL!, {
//     maxRetriesPerRequest: null,
// });

const connection = new IORedis({
    host: "127.0.0.1",
    port: 6379,
    maxRetriesPerRequest: null,
})

export const worker = new Worker( "certificates", async (job) => {
    const { document_id } = job.data;

    // 1. Fetch document
    // 3. Mark document as "processing"
    const claimed = await db.update(documents).set({ status: "processing" }).where(
        and(
            eq(documents.id, document_id),
            or(
                eq(documents.status, "pending"),
                eq(documents.status, "failed")
            )
        )
    ).returning()

    // 2. Ideompotency check
    const [document] = claimed;

    if(!document) {
        throw new Error("Document not found");
    }

    // 4.Fetch job
    const [batchJob] = await db.select().from(jobs).where(eq(jobs.id, document.job_id));
 
    if(!batchJob) {
        throw new Error("Job not found")
    }

    if(batchJob.status === "pending") {
        await db.update(jobs).set({ status: "processing" }).where(
            and(
                eq(jobs.id, batchJob.id),
                eq(jobs.status, "pending")
            )
        );
    }

    if(batchJob.status === "completed") {
        throw new Error("Job already completed");
    }

    const workerProfiler = new Profiler({
        worker: "CertificateWorker",
        operation: "Total Worker",
        batchJobId: batchJob.id,
        documentId: document_id,
    });

    try {
        // 5.Fetch template
       

        const [template] = await db.select().from(templates).where(eq(templates.id, batchJob.template_id));

        

        if(!template) {
            throw new Error("Template not found")
        }

        // 6. Fecth placeholders : PS there will be many placeholders for each template, but we are fetching all of them in one go to minimize DB calls. We can optimize this later if needed.
        const placeholders_definations = await db.select().from(placeholders).where(eq(placeholders.template_id, template.id));

        const formattedPlaceholders = placeholders_definations.map(p => ({
            ...p,
            x: Number(p.x),
            y: Number(p.y),
            width: Number(p.width),
            min_font_size:  p.min_font_size ? Number(p.min_font_size) : null,
        }));

        // 7. Fetch template buffer from S3
        if(template.s3_url === null) {
            throw new Error("Template has no associated buffer URL");
        }

        const templateProfiler = new Profiler({
            worker: "CertificateWorker",
            operation: "Template Fetch",
            batchJobId: batchJob.id,
            documentId: document_id
        })
        let templatePromise = getTemplate(template.id);

        if (!templatePromise) {
            templatePromise = fetchFileBuffer(template.s3_url, "CertificateWorker")
                .catch(err => {
                    removeTemplate(template.id);
                    throw err;
                });
            setTemplate(template.id, templatePromise);
            console.log(`CACHE MISS: template ${template.id} cached`);
        } else {
            console.log(`CACHE HIT: template ${template.id} fetched from cache`);
        }

        const templateBuffer = await templatePromise;
        templateProfiler.end();

        // 8. Validate data
        const data = document.recipient_data;

        for (const placeholder of placeholders_definations) {
            if (!(placeholder.key in data)) {
                throw new Error(`Missing field: ${placeholder.name}`);
            }
        }

        // 9 Upload

        const input = {
            templateBuffer,
            placeholders: formattedPlaceholders,
            data
        };

        const debugOptions = {
            enabled: true,
            showBoxes: true,
            showCenters: true,
            showBaselines: true
        };
        
        const renderProfiler = new Profiler({
            worker: "CertificateWorker",
            operation: "Render",
            batchJobId: batchJob.id,
            documentId: document_id
        });

        const renderedBuffer = await renderCertificate(input, debugOptions);
        console.log( `${document_id}: ${(renderedBuffer.length / 1024).toFixed(1)} KB`);

        renderProfiler.end();

        cacheRenderedCertificate(
            batchJob.id,
            document_id,
            {
                name: `${document_id}.png`,
                buffer: renderedBuffer
            }
        );
        
        // 9.5 Upload to S3 and get URL
        const uploadProfiler = new Profiler({
            worker: "CertificateWorker",
            operation: "Upload Certificate",
            batchJobId: batchJob.id,
            documentId: document_id
        });

        const response = await uploadGeneratedCertificate(
            renderedBuffer,
            document_id
        );

        uploadProfiler.end();
        
        // 10. Update document record with S3 URL and mark as completed
        await db.update(documents).set({ 
            s3_url: response.url, 
            status: "completed" 
        }).where(eq(documents.id, document_id));

        // 11. Update processed count in job
        await db.update(jobs).set({
            processed_count: sql`${jobs.processed_count} + 1`
        }).where(eq(jobs.id, batchJob.id));

        // 12. Mark Parent Job as completed if all documents are processed
        const [updatedJob] = await db.select().from(jobs).where(eq(jobs.id, batchJob.id));

        if(updatedJob && updatedJob.processed_count + updatedJob.failed_count === updatedJob.total_count) {
            const failedStatus = updatedJob.failed_count > 0 ? "failed" : "completed";
    
            if(failedStatus === "completed") {
                await enqueueFinalizeQueue(batchJob.id);
            } else {
                await db.update(jobs).set({ 
                    status: failedStatus, 
                    completed_at: new Date() 
                }).where(eq(jobs.id, batchJob.id));
            }

        }

    } catch (error) {
        // Required for bullmq retry
        console.error("Worker error:", error);

        const maxAttempts = job.opts.attempts ?? 1;

        if (job.attemptsMade + 1 >= maxAttempts) {
            await db.update(documents)
                .set({
                    status: "failed",
                    error: String(error)
                })
                .where(eq(documents.id, document_id));

            await db.update(jobs)
                .set({
                    last_error: String(error),
                    failed_count: sql`${jobs.failed_count} + 1`
                })
                .where(eq(jobs.id, batchJob.id));
        }


        throw error; 
    } finally {
        workerProfiler.end();
    }
}, { connection, concurrency: 5 });