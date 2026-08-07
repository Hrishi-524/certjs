import { Request, Response } from "express";
import { verifyCertificateService } from "#app/services/public/verify.service";
import { verifyTokenParamSchema } from "#app/schema/public.schema";

export async function verifyCertificate(req: Request, res: Response) {
    const { verifyToken } = verifyTokenParamSchema.parse(req.params);
    
    const verificationResult = await verifyCertificateService(verifyToken);

    if (!verificationResult) {
        return res.status(404).json({ 
            verified: false,
            message: "Certificate not found or invalid" 
        });
    }

    return res.status(200).json(verificationResult);
}