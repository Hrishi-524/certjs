import { documents, jobs, db } from "@certjs/db";
import type { Document, DocumentWithPresignedUrl } from "#app/types/document-types";
import { eq } from "drizzle-orm";
import { storage } from "@certjs/storage";
import { NotFoundError, UnauthorizedError } from "#app/middleware/express-errors";


export async function getDocumentService(
    docId: string,
    userId: string,
): Promise<DocumentWithPresignedUrl> {
    const [doc] = await db
        .select()
        .from(documents)
        .where(eq(documents.id, docId));

    if (!doc) {
        throw new NotFoundError("Document not found");
    }

    const [job] = await db
        .select()
        .from(jobs)
        .where(eq(jobs.id, doc.jobId))
        .limit(1);

    if (!job) {
        throw new NotFoundError("Job not found");
    }

    if (job.userId !== userId) {
        throw new UnauthorizedError("Unauthorized");
    }

    let presignedUrl: string | null = null;

    if (doc.status === "completed" && doc.storageKey) {
        presignedUrl = await storage.getSignedUrl(doc.storageKey);
    }

    return {
        ...doc,
        presignedUrl,
    };
}

export async function downloadDocumentService(
    docId: string,
    userId: string,
): Promise<string> {
    const doc = await getDocumentService(docId, userId);

    if (doc.status !== "completed" || doc.presignedUrl === null) {
        throw new NotFoundError("Document not available for download");
    }

    return doc.presignedUrl;
}
