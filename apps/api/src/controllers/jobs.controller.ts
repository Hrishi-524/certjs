import type { Request, Response, NextFunction } from "express";
import { createBatchJobService } from "@/services/jobs.service";
import { createJobSchema } from "@/validations/jobs.validations";

export const createBatchJob = async (
    req: Request,
    res: Response,
) => {
    const parsed = createJobSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            error: parsed.error.issues[0].message,
            details: parsed.error.issues,
        });
    }

    const { template_id, recipients, idempotency_key } = parsed.data;

    const job = await createBatchJobService({
        template_id,
        recipients,
        idempotency_key,
    });

    return res.status(201).json({
        job_id: job.id,
        status: job.status,
    });
};

export const getJobStatus = async (req: Request, res: Response, next: NextFunction) => {
    
}

export const downloadJobZip = async (req: Request, res: Response, next: NextFunction) => {
    
}

export const retryJob = async (req: Request, res: Response, next: NextFunction) => {
    
}

export const getJobDocuments = async (req: Request, res: Response, next: NextFunction) => {
    
}