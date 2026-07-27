import type { Document } from "./documents.types";

export type JobStatus = "pending" | "processing" | "completed" | "failed";

export type RecipientData = Record<string, string | number>;

export type PlaygroundPreviewInput = {
    templateId: string;
    recipient: Record<string, string | number>;
};

export type CreateBatchJobInput = {
    templateId: string;
    recipients: RecipientData[]; // min 1
    idempotencyKey: string;
    webhookUrl?: string;
}

export type GetPlaygroundPreviewResponse = {
    previewUrl: string;
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
        jobType: "CERTIFICATE_BATCH";
        totalCount: number;
        processedCount: number;
        failedCount: number;
        lastError: string | null;
        jobId: string;
        retryCount: number;
        maxRetries: number;
        failedAt: Date | null;
        presignedZipUrl: string | null;
        webhookUrl: string | null;
        webhookSecret: string | null;
        createdAt: Date;
        completedAt: Date | null;
    }
}

export type JobSummary = {
    id: string;

    status: "pending" | "processing" | "completed" | "failed";

    totalCount: number;
    processedCount: number;
    failedCount: number;

    retryCount: number;
    maxRetries: number;

    createdAt: string;
    completedAt: string | null;

    template: {
        id: string;
        name: string;
    } | null;
};

export type GetJobsResponse = {
    total: number;
    jobs: JobSummary[];
};

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
    presignedZipUrl: string;
}