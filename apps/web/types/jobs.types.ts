import type { Document } from "./documents.types";

export type JobStatus = "pending" | "processing" | "completed" | "failed";

export type RecipientData = Record<string, string | number>;

export type CreateBatchJobInput = {
    templateId: string;
    recipients: RecipientData[]; // min 1
    idempotencyKey: string;
    webhookUrl?: string;
}

export type CreateBatchJobResponse = {
    jobId: string;
    status: JobStatus;
    totalCount: number;
    processedCount: number;
}

export type GetBatchJobStatusResponse = {
    status: JobStatus;
    meta: {
        totalCount: number;
        processedCount: number;
        failedCount: number;
        lastError: string | null;
    }
}

export type ListBatchJobDocumentsResponse = {
    count: number;
    documents: Document[];
}

export type RetryFailedDocumentsResponse = {
    message: "Job queued for retry";
    retryCount: {
        retriedCount: number;
    }
}

export type DownloadBatchJobDocumentsResponse = {
    zipUrl: string;
}