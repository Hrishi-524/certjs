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

    return {
        doc,
        job_status: job.status,
        template_id: job.template_id,
    };
}

export async function downloadDocumentService(docId: string, userId: string) {
    const { doc, job_status, template_id } = await getDocumentService(docId, userId);

    if(doc.status !== "completed" || !doc.s3_url) {
        throw new NotFoundError("Document not available for download");
    }

    const s3Key = doc.s3_url.split(".amazonaws.com/")[1];

    if(!s3Key) {
        throw new NotFoundError("Invalid S3 URL stored for document");
    }

    const presignedUrl = await generatePresignedUrl(s3Key);

    return presignedUrl;
}