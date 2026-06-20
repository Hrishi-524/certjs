import { db } from "@certjs/db";
import { eq, and } from "drizzle-orm";
import { templates, jobs, documents, placeholders } from "@certjs/db/schema";
import { enqueueDocument } from "@/services/queue/queue.service";
import type { CreateJobParams } from "@/types/jobs-types";
import crypto from "crypto";
import { sql } from "drizzle-orm";
import { BadRequestError, ForbiddenError, InternalServerError, NotFoundError } from "@/middleware/express-errors";

export async function createBatchJobService(params: CreateJobParams) {
    // 1. Validate template exists
    const [template] = await db.select().from(templates).where(
        eq(templates.id, params.templateId)
    );

    if(!template) {
        throw new NotFoundError("Template not found")
    }

    // 2. Validate ownership
    if(template.user_id !== params.userId) {
        throw new ForbiddenError("You dont own this template")
    }

    // 3. Validate template active
    if(!template.is_active) {
        throw new BadRequestError("Template is inactive")
    }

    // 4. Load Placeholders
    const placeholdersList = await db.select().from(placeholders).where(
        eq(placeholders.template_id, template.id)
    )

    // 5. Ensure that template has placeholders
    if (placeholdersList.length === 0) {
        throw new BadRequestError( "Template has no placeholders" );
    }
    
    // 6. Extract required keys
    const requiredKeys = new Set( placeholdersList.map(p => p.key) )

    // 7. Validate recipients array
    if(params.recipients.length === 0) {
        throw new BadRequestError( "Request has no recipients" );
    }

    // 8. Validate every recipient
    for(const recipient of params.recipients) {
        for(const key of requiredKeys) {
            if(recipient[key] === undefined) {
                throw new BadRequestError( `Missing placeholder key: ${key}` );
            }
        }
    }

    // 9. Idempotency Check
    if (params.idempotencyKey) {
        const [existingJob] = await db
            .select()
            .from(jobs)
            .where(
                and(
                    eq(jobs.user_id, params.userId),
                    eq(jobs.idempotency_key, params.idempotencyKey)
                )
            );

        if (existingJob) {
            return {
                job: {
                    id: existingJob.id,
                    status: existingJob.status,
                    total_count: existingJob.total_count,
                    processed_count: existingJob.processed_count
                }
            };
        }
    }

    const { createdDocuments, job } = await db.transaction(async (tx) => {
        // 10. Create Parent Job
        const [job] = await tx.insert(jobs).values({
            job_type: "CERTIFICATE_BATCH",
            idempotency_key: params.idempotencyKey,
            user_id: params.userId,
            template_id: params.templateId,
            status: "pending",
            total_count: params.recipients.length,
            processed_count: 0,
            webhook_url: params.webhookUrl
        }).returning()

        // 11. Create Document Rows - Child Job (document in bullmq job)
        const documentsList = params.recipients.map(recipient => ({
            job_id: job.id,
            recipient_data: recipient, 
            verify_token: crypto.randomBytes(32).toString("hex")
        }))
        
        // 12. Insert All Dcoument Rows
        const createdDocuments = await tx.insert(documents).values(documentsList).returning()

        return { createdDocuments, job }
    })

    if (createdDocuments.length !== params.recipients.length) {
        throw new InternalServerError( "Failed to create all document records" );
    }

    // 13. Enqueue BullMQ Child Jobs
    await enqueueDocument(createdDocuments, job.id);

    // 14. Return Summary
    return {
        job: {
            id: job.id,
            status: job.status,
            total_count: job.total_count,
            processed_count: job.processed_count,
            failed_count: job.failed_count // usually 0
        }
    };
}

export async function getJobStatusService(jobId: string, userId: string) {
    const [job] = await db.select().from(jobs).where(
        and(
            eq(jobs.id, jobId),
            eq(jobs.user_id, userId)
        )
    )

    if(!job) {
        throw new NotFoundError("Job with given job_id not found")
    }

    return {
        status: job.status,
        meta: {
            total_count: job.total_count,
            processed_count: job.processed_count,
            failed_count: job.failed_count,
            last_error: job.last_error
        }
    }
}

export async function getZip(jobId: string, userId: string) {
    const [job] = await db.select().from(jobs).where(
        and(
            eq(jobs.id, jobId),
            eq(jobs.user_id, userId)
        )
    )

    if(!job) {
        throw new NotFoundError("Job not found")
    }

    if(job.status !== "completed" || !job.zip_s3_url) {
        return undefined
    }

    return job.zip_s3_url
}

export async function retryJobService(jobId: string, userId: string) {
    const [job] = await db.select().from(jobs).where(
        and(
            eq(jobs.id, jobId),
            eq(jobs.user_id, userId)
        )
    )

    if (!job) {
        throw new NotFoundError("Job not found");
    }

    const failedDocs = await db.select().from(documents).where(
        and(
            eq(documents.job_id, jobId),
            eq(documents.status, "failed")
        )
    )

    if (failedDocs.length === 0) {
        throw new BadRequestError("No failed documents to retry");
    }

    await db.update(documents).set({
        status: "pending",
        error: null
    }).where(
        and(
            eq(documents.job_id, jobId),
            eq(documents.status, "failed")
        )
    );

    await db.update(jobs).set({
        status: "processing",
        last_error: null,
        failed_count: sql`${jobs.failed_count} - ${failedDocs.length}`
    }).where(eq(jobs.id, jobId));

    await enqueueDocument(failedDocs, jobId);

    return {
        retried_count: failedDocs.length
    };
}

export async function getJobDocumentsService(jobId: string, userId: string) {
    const [job] = await db.select().from(jobs).where(
        and(
            eq(jobs.id, jobId),
            eq(jobs.user_id, userId)
        )
    )

    if (!job) {
        throw new NotFoundError("Job not found");
    }

    const docs = await db.select().from(documents).where(
        eq(documents.job_id, jobId)
    )

    return docs;
}