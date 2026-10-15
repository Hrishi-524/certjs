import { db } from "@certjs/db";
import { NotFoundError } from "#app/middleware/express-errors";
import { documents, jobs, templates } from "@certjs/db";
import { eq } from "drizzle-orm";

const unverifiedResponse = {
    verified: false,
    message: "Certificate not found or invalid or is not generated yet"
}

export async function verifyCertificateService(verifyToken: string): Promise<any> {
    const [row] = await db.select()
        .from(documents)
        .innerJoin(jobs, eq(documents.jobId, jobs.id))
        .innerJoin(templates, eq(jobs.templateId, templates.id))
        .where(eq(documents.verifyToken, verifyToken));

    if(!row) {
        return unverifiedResponse;
    }

    if (row.documents.status !== "completed") {
        return unverifiedResponse;
    }

    return {
        verified: true,
        templateName: row.templates.name,
        recipient: row.documents.recipientData,
        issuedAt: row.documents.createdAt,
        status: row.documents.status
    }
}