/**
 * Certificate Worker
 *
 * Responsible for processing individual certificate documents.
 *
 * Flow:
 *  1. Atomically claim the document (pending/failed → processing)
 *  2. Load job, template, and placeholder definitions
 *  3. Fetch the template from storage or template cache
 *  4. Render the certificate using the persisted recipient data
 *  5. Upload the generated certificate to storage
 *  6. Mark the document as completed and increment the job's processed count
 *  7. Enqueue the completed document for the Delivery Worker
 *
 * Responsibilities:
 *  - Certificate generation
 *  - Document/job state updates
 *  - Template caching
 *  - Generation profiling
 *
 * Not responsible for:
 *  - Email or webhook delivery
 *  - ZIP/batch artifact creation
 *  - Batch finalization
 *
 * The database is the source of truth. Storage/cache is used for
 * certificate artifacts and performance optimization.
*/

import { Worker } from "bullmq";
import IORedis from "ioredis";
import { renderCertificate } from "@certjs/core/render-engine"
import { documents, jobs, templates, placeholders } from "@certjs/db/schema"
import fetchFileBuffer from "./fetch-file-buffer";
import { db } from "@certjs/db"
import { or, and, eq } from "drizzle-orm";
import { uploadGeneratedCertificate } from "./upload-rendered-document";
import { sql } from "drizzle-orm";
import "./finalizer-worker"
import "./webhook-worker"
import { Profiler } from "./utils/profiler";
import { getTemplate, removeTemplate, setTemplate } from "./utils/template-cache";
import { cacheRenderedCertificate } from "./utils/finalizer-buffer-cache";
import { enqueueDeliveryQueue } from "./queues/delivery-queue";

const connection = new IORedis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: null,
});

export const worker = new Worker( "certificates", async (job) => {
    const { document_id } = job.data;

    // 1. Ideompotency
    const claimed = await db.update(documents).set({ status: "processing" }).where(
        and(
            eq(documents.id, document_id),
            or(
                eq(documents.status, "pending"),
                eq(documents.status, "failed")
            )
        )
    ).returning()

    const [document] = claimed;
    
    if(!document) {
        throw new Error("Document not found");
    }
    
    // 2. Database Extractions
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
    
    const [template] = await db.select().from(templates).where(eq(templates.id, batchJob.template_id));
    
    if(!template) {
        throw new Error("Template not found")
    }
    
    const placeholderDefinations = await db.select().from(placeholders).where(eq(placeholders.template_id, template.id));

    const formattedPlaceholders = placeholderDefinations.map(p => ({
        ...p,
        x: Number(p.x),
        y: Number(p.y),
        width: Number(p.width),
        min_font_size:  p.min_font_size ? Number(p.min_font_size) : null,
    }));

    try {
        // 3. Get the Template Buffer from storage/cache
        if(template.s3_url === null) {
            throw new Error("Template has no associated buffer URL");
        }

        const templateProfiler = new Profiler({
            worker: "CertificateWorker",
            operation: "Template Fetch",
            batchJobId: batchJob.id,
            documentId: document_id
        });

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

        // 4. Generate certificate
        const recipientRecord = document.recipient_data;

        const input = {
            templateBuffer,
            placeholders: formattedPlaceholders,
            data: recipientRecord
        };
        
        const renderProfiler = new Profiler({
            worker: "CertificateWorker",
            operation: "Render",
            batchJobId: batchJob.id,
            documentId: document_id
        });

        const renderedBuffer = await renderCertificate(input);

        renderProfiler.end();

        cacheRenderedCertificate(
            batchJob.id,
            document_id,
            {
                name: `${document_id}.png`,
                buffer: renderedBuffer
            }
        );
        
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
        
        // 5. Update Database
        await db.update(documents).set({ 
            s3_url: response.url, 
            status: "completed" 
        }).where(eq(documents.id, document_id));

        await db.update(jobs).set({
            processed_count: sql`${jobs.processed_count} + 1`
        }).where(eq(jobs.id, batchJob.id));

        // 6. Enqueue for delivery
        await enqueueDeliveryQueue(document_id, batchJob.id);

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