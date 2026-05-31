import { db } from "@certjs/db";
import { templates, jobs, documents } from "@certjs/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { certificateQueue } from "@certjs/queue";

type createBatchJobParams = {
    template_id: string;
    recipients: Record<string, any>[];
    idempotency_key: string;
}
export async function createBatchJobService(params: createBatchJobParams) {
    // 1. VALIDATE INPUT
    const [template] = await db.select().from(templates).where(eq(templates.id, params.template_id));
    if (!template) {
        throw new Error("Template not found");
    }

    // 2. HANDLE IDEMPOTENCY
    if (params.idempotency_key) {
        const existingJob = await db.select().from(jobs).where(eq(jobs.idempotency_key, params.idempotency_key));
        if (existingJob.length > 0) {
            return existingJob[0];
        }
    }

    // const { job, docs } = await db.transaction(async (tx) => {
        // 3. CREATE JOB (DB)
        const [job] = await db.insert(jobs).values({
            job_type: "CERTIFICATE_BATCH",
            idempotency_key: params.idempotency_key,
            user_id: template.user_id,
            template_id: params.template_id,
            total_count: params.recipients.length,
            zip_s3_url: null,
            processed_count: 0,
        }).returning();

        const docs = []

        for(const recipient_data of params.recipients) {
            // 4. CREATE DOCUMENTS (DB)
            const [document] = await db.insert(documents).values({
                job_id: job.id, // should it be batch job_id or child job_id
                recipient_data: recipient_data,
                verify_token: crypto.randomBytes(32).toString("hex"),
                s3_url: "",
            }).returning();

            docs.push(document);
        }

        // return { job, docs };
    // });

    // 5. ENQUEUE DOCUMENT JOBS
    await Promise.all(
        docs.map((doc) => certificateQueue.add(
            "generate_document",
            { document_id : doc.id },
            {
                attempts: 3,
                backoff: { type: "exponential", delay: 2000 }
            }
        ))
    )

    // 6. RETURN RESPONSE
    return job;
}
