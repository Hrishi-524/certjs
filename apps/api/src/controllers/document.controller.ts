import type { Request, Response, NextFunction } from "express";
import { documentIdParamSchema } from "@/schema/documents.schema";
import { UnauthorizedError } from "@/middleware/express-errors";
import { getDocumentService, downloadDocumentService } from "@/services/documents/documents.service";

export async function getDocument(req: Request, res: Response) {
    const { documentId } = documentIdParamSchema.parse(req.params);

    const user_id = req.user?.id

    if(!user_id) {
        throw new UnauthorizedError("Unauthorized - cannot create jobs")
    }

    const data = await getDocumentService(documentId, user_id);

    return res.status(200).json({
        ...data.doc,
        job_status: data.job_status,
        template_id: data.template_id,
    });
    /*  following is data.doc structure based on documents schema, can be used for reference
        (property) doc: {
            id: string;
            job_id: string;
            recipient_data: RecipientData;
            status: "pending" | "processing" | "completed" | "failed";
            error: string | null;
            verify_token: string;
            s3_url: string | null;
            created_at: Date;
        } 
    */
}

export async function downloadDocument(req: Request, res: Response) {
    const { documentId } = documentIdParamSchema.parse(req.params);

    const user_id = req.user?.id;

    if (!user_id) {
        throw new UnauthorizedError("Unauthorized");
    }

    const url = await downloadDocumentService(documentId, user_id);

    return res.status(200).json({
        url
    });
}