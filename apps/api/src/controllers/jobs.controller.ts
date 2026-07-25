import type { Request, Response } from "express";
import { CreateJobSchema, JobIdParamSchema, playgroundPreviewSchema } from "@/schema/jobs.schema";
import {
    createBatchJobService,
    playgroundPreviewService,
    getJobStatusService,
    getZip,
    retryJobService,
    getJobDocumentsService
} from "@/services/jobs/jobs.service";
import { UnauthorizedError } from "@/middleware/express-errors";
import generatePresignedUrl from "@/services/documents/get-signed-url";

export async function playgroundPreview(req: Request, res: Response) {
    const data = playgroundPreviewSchema.parse(req.body);
    const userId = req.user.id
    
    const buffer = await playgroundPreviewService(data.templateId, data.recipient, userId);

    res.setHeader("Content-Type", "image/png");
    res.send(buffer);
}

export async function createBatchJob( req: Request, res: Response ) {
    const data = CreateJobSchema.parse(req.body);
    const userId = req.user.id

    const jobMeta = await createBatchJobService({
        userId: userId,
        ...data
    })
    
    return res.status(201).json({
        jobId: jobMeta.job.id,
        status: jobMeta.job.status,
        totalCount: jobMeta.job.total_count,
        processedCount: jobMeta.job.processed_count
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
/*
    const jobStatus: {
        status: "pending" | "processing" | "completed" | "failed";
        meta: {
            totalCount: number;
            processedCount: number;
            failedCount: number;
            lastError: string | null;
        };
    }
*/

}

export async function downloadJobZip(req: Request, res: Response) {
    const { jobId  } = JobIdParamSchema.parse(req.params)
    const userId = req.user.id

    if(!userId) {
        throw new UnauthorizedError("Unauthorized - cannot create jobs")
    }

    const zipUrl = await getZip(jobId, userId)
    
    if (!zipUrl) {
        return res.status(409).json({ message: "Job not completed yet" });
    }
    
    const url = new URL(zipUrl);

    const key = url.pathname.slice(1); // removes leading '/'

    const presignedZipUrl = await generatePresignedUrl(key);

    return res.status(200).json({presignedZipUrl})
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
        retryCount: result
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
/*
    const documents: {
        id: string;
        jobId: string;
        recipientData: RecipientData;
        status: "pending" | "processing" | "completed" | "failed";
        error: string | null;
        verifyToken: string;
        s3Url: string | null;
        createdAt: Date;
    }[]
*/
}   