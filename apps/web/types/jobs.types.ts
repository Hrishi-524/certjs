import type { Document } from "./documents.types";

export type JobStatus = "pending" | "processing" | "completed" | "failed";

export type RecipientValue = string | number;

export type RecipientData = Record<string, RecipientValue>;

export type DeliveryChannel = "email" | "webhook" | "dashboard";

export type DeliveryScope = "recipient" | "batch";

export type DeliveryArtifact = "certificate" | "zip";

export type DeliveryContent = {
    body: string;
};

export type JobDeliverySemantics = {
    channel: DeliveryChannel;
    scope: DeliveryScope;
    destination: string[];
    content: DeliveryContent | null;
    artifact: DeliveryArtifact;
};

export type IdentificationCase = "lower" | "upper" | "preserve";

export type IdentificationCollision = "prefix" | "suffix";

export type JobIdentificationSemantics = {
    fields: string[];
    separator?: string; // default " "
    case?: IdentificationCase; // default "preserve"
    collision?: IdentificationCollision; // default "suffix"
    docId?: boolean; // default false
};

export type JobSemantics = {
    deliveries: JobDeliverySemantics[];
    identification: JobIdentificationSemantics;
};

export type PlaygroundPreviewInput = {
    templateId: string;
    recipient: Record<string, string | number>;
};

export type CreateBatchJobInput = {
    templateId: string;
    recipients: RecipientData[]; // min 1
    semantics: JobSemantics;
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
