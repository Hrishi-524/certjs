import type { Request, Response, NextFunction } from "express";
import { documentIdParamSchema } from "@/schema/documents.schema";
import { UnauthorizedError } from "@/middleware/express-errors";
import { getDocumentService, downloadDocumentService } from "@/services/documents/documents.service";

export async function getDocument(req: Request, res: Response) {
    const { documentId } = documentIdParamSchema.parse(req.params);

    const userId = req.user?.id

    if(!userId) {
        throw new UnauthorizedError("Unauthorized - cannot create jobs")
    }

    const docAndMeta = await getDocumentService(documentId, userId);

    return res.status(200).json(docAndMeta);
    /*  
        const docAndMeta: {
            id: string;
            jobId: string;
            recipientData: RecipientData;
            status: "pending" | "processing" | "completed" | "failed";
            error: string | null;
            verifyToken: string;
            s3Url: string | null;
            createdAt: Date;
            jobStatus: "pending" | "processing" | "completed" | "failed";
            templateId: string;
        }
    */
}

export async function downloadDocument(req: Request, res: Response) {
    const { documentId } = documentIdParamSchema.parse(req.params);

    const userId = req.user?.id;

    if (!userId) {
        throw new UnauthorizedError("Unauthorized");
    }

    const presignedUrl = await downloadDocumentService(documentId, userId);

    return res.status(200).json({presignedUrl});
}