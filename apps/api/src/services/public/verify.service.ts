import { db } from "@certjs/db";
import { NotFoundError } from "@/middleware/express-errors";
import { documents, jobs, templates } from "@certjs/db";
import { eq } from "drizzle-orm";

const unverifiedResponse = {
    verified: false,
    message: "Certificate not found or invalid or is not generated yet"
}

export async function verifyCertificateService(verifyToken: string) {
    const [row] = await db.select()
        .from(documents)
        .innerJoin(jobs, eq(documents.job_id, jobs.id))
        .innerJoin(templates, eq(jobs.template_id, templates.id))
        .where(eq(documents.verify_token, verifyToken));

    if(!row) {
        return unverifiedResponse;
    }

    if (row.documents.status !== "completed") {
        return unverifiedResponse;
    }

    return {
        verified: true,
        template_name: row.templates.name,
        recipient: row.documents.recipient_data,
        issued_at: row.documents.created_at,
        status: row.documents.status
    }
}