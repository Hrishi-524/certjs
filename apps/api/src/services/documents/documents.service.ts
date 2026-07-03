import { documents, jobs } from "@certjs/db";
import { db } from "@certjs/db";
import { eq, and } from "drizzle-orm";
import generatePresignedUrl from "./get-signed-url";
import { NotFoundError, UnauthorizedError } from "@/middleware/express-errors";

export async function getDocumentService(docId: string, userId: string) { 
    const [doc] = await db.select().from(documents).where(eq(documents.id, docId));

    if(!doc) {
        throw new NotFoundError("Document not found");
    }

    const job = await db.select().from(jobs).where(eq(jobs.id, doc.job_id)).limit(1).then(res => res[0]);

    if (!job) {
        throw new NotFoundError("Job not found");
    }

    if (job.user_id !== userId) {
        throw new UnauthorizedError("Unauthorized");
    }

    const normalizedDoc = {
        id: doc.id,
        jobId: doc.job_id,
        recipientData: doc.recipient_data,
        status: doc.status,
        error: doc.error,
        verifyToken: doc.verify_token,
        s3Url: doc.s3_url,
        createdAt: doc.created_at,
        jobStatus: job.status,
        templateId: job.template_id,
    }
    return normalizedDoc;
}

export async function downloadDocumentService(docId: string, userId: string) {
    const normalizedDoc = await getDocumentService(docId, userId);

    if(normalizedDoc.status !== "completed" || !normalizedDoc.s3Url) {
        throw new NotFoundError("Document not available for download");
    }

    const s3Key = normalizedDoc.s3Url.split(".amazonaws.com/")[1];

    if(!s3Key) {
        throw new NotFoundError("Invalid S3 URL stored for document");
    }

    const presignedUrl = await generatePresignedUrl(s3Key);

    return presignedUrl;
}