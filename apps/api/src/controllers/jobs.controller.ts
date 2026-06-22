import type { Request, Response } from "express";
import { CreateJobSchema, JobIdParamSchema } from "@/schema/jobs.schema";
import {
    createBatchJobService,
    getJobStatusService,
    getZip,
    retryJobService,
    getJobDocumentsService
} from "@/services/jobs/jobs.service";
import { UnauthorizedError } from "@/middleware/express-errors";

export async function createBatchJob( req: Request, res: Response ) {
    const data = CreateJobSchema.parse(req.body);
    const user_id = req.user.id
    
    const jobMeta = await createBatchJobService({
        userId: user_id,
        ...data
    })
    
    return res.status(201).json({
        job_id: jobMeta.job.id,
        status: jobMeta.job.status,
        total_count: jobMeta.job.total_count,
        processed_count: jobMeta.job.processed_count
    })
};

export async function getJobStatus(req: Request, res: Response) {
    const { jobId  } = JobIdParamSchema.parse(req.params)
    const userId = req.user.id

    if(!userId) {
        throw new UnauthorizedError("Unauthorized - cannot create jobs")
    }

    const jobStatus = await getJobStatusService(
        jobId, 
        userId
    );

    return res.status(200).json(jobStatus)
}

export async function downloadJobZip(req: Request, res: Response) {
    const { jobId  } = JobIdParamSchema.parse(req.params)
    const userId = req.user.id

    if(!userId) {
        throw new UnauthorizedError("Unauthorized - cannot create jobs")
    }

    const zip_url = await getZip(jobId, userId)

    if (!zip_url) {
        return res.status(409).json({ message: "Job not completed yet" });
    }

    return res.status(200).json(zip_url)
}

export async function retryJob(req: Request, res: Response) {
    const { jobId } = JobIdParamSchema.parse(req.params);

    const userId = req.user.id;

    if (!userId) {
        throw new UnauthorizedError(
            "Unauthorized - cannot retry jobs"
        );
    }

    const result = await retryJobService(
        jobId,
        userId
    );

    return res.status(200).json({
        message: "Job queued for retry",
        job: result
    });
}

export async function getJobDocuments(req: Request, res: Response) {
    const { jobId } = JobIdParamSchema.parse(req.params);

    const userId = req.user.id;

    if (!userId) {
        throw new UnauthorizedError(
            "Unauthorized - cannot access jobs"
        );
    }

    const documents = await getJobDocumentsService(
        jobId,
        userId
    );

    return res.status(200).json({
        count: documents.length,
        documents
    });
}   