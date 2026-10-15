import { db } from "@certjs/db";
import { eq, and } from "drizzle-orm";
import { templates, jobs, documents, placeholders } from "@certjs/db/schema";
import { enqueueDocument } from "#app/services/queue/queue.service";
import type { CreateJobParams, ValidationResult } from "#app/types/jobs-types";
import crypto from "crypto";
import { sql } from "drizzle-orm";
import { BadRequestError, ForbiddenError, InternalServerError, NotFoundError } from "#app/middleware/express-errors";
import fetchFileBuffer from "#app/utils/fetch-file-buffer"
import{ renderCertificate} from "@certjs/core/render-engine"
import { storage } from "@certjs/storage";
import { validate } from "./validate.service.js";

export async function createBatchJobService(params: CreateJobParams) {
    // 1. Validate template exists
    const [template] = await db.select().from(templates).where(
        eq(templates.id, params.templateId)
    );

    if(!template) {
        throw new NotFoundError("Template not found")
    }

    // 2. Validate ownership
    if(template.userId !== params.userId) {
        throw new ForbiddenError("You dont own this template")
    }

    // 3. Validate template active
    if(!template.isActive) {
        throw new BadRequestError("Template is inactive")
    }

    // 4. Idempotency Check
    if (params.idempotencyKey) {
        const [existingJob] = await db
            .select()
            .from(jobs)
            .where(
                and(
                    eq(jobs.userId, params.userId),
                    eq(jobs.idempotencyKey, params.idempotencyKey)
                )
            );

        if (existingJob) {
            return {
                job: {
                    id: existingJob.id,
                    status: existingJob.status,
                    totalCount: existingJob.totalCount,
                    processedCount: existingJob.processedCount
                }
            };
        }
    }

    // 5. Load Placeholders
    const placeholdersList = await db.select().from(placeholders).where(
        eq(placeholders.templateId, template.id)
    )

    // 6. Validate data
    const validationResult: ValidationResult = validate(params.recipients, params.semantics, placeholdersList);

    const fileterdRecipients = validationResult.sanitizedData;

    if (fileterdRecipients.length === 0) {
        throw new BadRequestError("No valid recipients to process");
    }

    const { createdDocuments, job } = await db.transaction(async (tx) => {
        // 7. Create Parent Job
        const [job] = await tx.insert(jobs).values({
            jobType: "CERTIFICATE_BATCH",
            idempotencyKey: params.idempotencyKey,
            userId: params.userId,
            templateId: params.templateId,
            status: "pending",
            totalCount: fileterdRecipients.length,
            processedCount: 0,
            semantics: params.semantics
        }).returning()

        // 8. Create Document Rows - Child Job (document in bullmq job)
        const documentsList = fileterdRecipients.map(recipient => ({
            jobId: job.id,
            recipientData: recipient, 
            verifyToken: crypto.randomBytes(32).toString("hex")
        }))
        
        // 9. Insert All Dcoument Rows
        const createdDocuments = await tx.insert(documents).values(documentsList).returning()

        return { createdDocuments, job }
    })

    // 10. Enqueue BullMQ Child Jobs
    await enqueueDocument(createdDocuments, job.id);

    // 11. Return Summary
    return {
        job: {
            id: job.id,
            status: job.status,
            totalCount: job.totalCount,
            processedCount: job.processedCount,
            failedCount: job.failedCount // usually 0
        },
        validationResult
    };
}

export async function getJobStatusService(jobId: string, userId: string): Promise<any> {
    const [job] = await db.select().from(jobs).where(
        and(
            eq(jobs.id, jobId),
            eq(jobs.userId, userId)
        )
    )

    if(!job) {
        throw new NotFoundError("Job with given jobId not found")
    }

    if(job.status === "completed" && !job.zipKey) {
        throw new InternalServerError("Job is completed but zipKey is missing")
    }

    let presignedZipUrl: string | null = null;

    if(job.status === "completed" && job.zipKey) {
        presignedZipUrl = await storage.getSignedUrl(job.zipKey);
    }

    return {
        status: job.status,
        meta: {
            jobType: job.jobType,
            totalCount: job.totalCount,
            processedCount: job.processedCount,
            failedCount: job.failedCount,
            lastError: job.lastError,
            jobId: job.id,
            retryCount: job.retryCount,
            maxRetries: job.maxRetries,
            failedAt: job.failedAt,
            presignedZipUrl: presignedZipUrl,
            semantics: job.semantics,
            createdAt: job.createdAt,
            completedAt: job.completedAt
        }
    }
}

export async function playgroundPreviewService(
    templateId: string,
    recipient: Record<string, string | number>,
    userId: string
) {
    // 1. Validate template exists
    const [template] = await db
        .select()
        .from(templates)
        .where(eq(templates.id, templateId));

    if (!template) {
        throw new NotFoundError("Template not found");
    }

    // 2. Validate ownership
    if (template.userId !== userId) {
        throw new ForbiddenError("You don't own this template");
    }

    // 3. Validate template active
    if (!template.isActive) {
        throw new BadRequestError("Template is inactive");
    }

    // 4. Load placeholders
    const placeholdersList = await db
        .select()
        .from(placeholders)
        .where(eq(placeholders.templateId, template.id));

    if (placeholdersList.length === 0) {
        throw new BadRequestError("Template has no placeholders");
    }

    // 5. Validate recipient data
    for (const placeholder of placeholdersList) {
        if (recipient[placeholder.key] === undefined) {
            throw new BadRequestError(
                `Missing placeholder key: ${placeholder.key}`
            );
        }
    }

    // 6. Download template image
    const templateBuffer = await fetchFileBuffer(template.storageKey);

    if (!templateBuffer) {
        throw new InternalServerError("Unable to load template image");
    }

    // 7. Render
    const input = {
        templateBuffer,
        placeholders: placeholdersList,
        data: recipient
    };

    const debugOptions = {
        enabled: true,
        showBoxes: true,
        showCenters: true,
        showBaselines: true
    };

    const renderedBuffer = await renderCertificate(input, debugOptions);

    // 8. Return PNG buffer
    return renderedBuffer;
}

export async function getZip(jobId: string, userId: string) {
    const [job] = await db.select().from(jobs).where(
        and(
            eq(jobs.id, jobId),
            eq(jobs.userId, userId)
        )
    )

    if(!job) {
        throw new NotFoundError("Job not found")
    }

    if(job.status !== "completed" || !job.zipKey) {
        return undefined
    }

    return job.zipKey
}

export async function retryJobService(jobId: string, userId: string) {
    const [job] = await db.select().from(jobs).where(
        and(
            eq(jobs.id, jobId),
            eq(jobs.userId, userId)
        )
    )

    if (!job) {
        throw new NotFoundError("Job not found");
    }

    const failedDocs = await db.select().from(documents).where(
        and(
            eq(documents.jobId, jobId),
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
            eq(documents.jobId, jobId),
            eq(documents.status, "failed")
        )
    );

    await db.update(jobs).set({
        status: "processing",
        lastError: null,
        failedCount: sql`${jobs.failedCount} - ${failedDocs.length}`
    }).where(eq(jobs.id, jobId));

    await enqueueDocument(failedDocs, jobId);

    return {
        retriedCount: failedDocs.length
    };
}

export async function getJobDocumentsService(jobId: string, userId: string): Promise<any> {
    const [job] = await db.select().from(jobs).where(
        and(
            eq(jobs.id, jobId),
            eq(jobs.userId, userId)
        )
    )

    if (!job) {
        throw new NotFoundError("Job not found");
    }

    const docs = await db.select().from(documents).where(
        eq(documents.jobId, jobId)
    )

    const normalizedDocs = docs.map(doc => ({
        id: doc.id,
        jobId: doc.jobId,
        recipientData: doc.recipientData,
        status: doc.status,
        error: doc.error,
        verifyToken: doc.verifyToken,
        storageKey: doc.storageKey,
        createdAt: doc.createdAt
    }))

    return normalizedDocs;
}

export async function getJobsService(userId: string) {
    const jobsList = await db.select({
        id: jobs.id,

        status: jobs.status,

        totalCount: jobs.totalCount,
        processedCount: jobs.processedCount,
        failedCount: jobs.failedCount,

        retryCount: jobs.retryCount,
        maxRetries: jobs.maxRetries,

        createdAt: jobs.createdAt,
        completedAt: jobs.completedAt,

        template : {
            id: templates.id,
            name: templates.name,
        }
    }).from(jobs).leftJoin(templates, 
        eq(jobs.templateId, templates.id)
    ).where(
        eq(jobs.userId, userId)
    );

    return jobsList;
}
