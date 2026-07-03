export type Document = {
    id: string;
    jobId: string;
    recipientData: Record<string, string | number>;
    status: "pending" | "processing" | "completed" | "failed";
    error: string | null;
    verifyToken: string;
    s3Url: string | null;
    createdAt: string;
};

export type GetDocumentResponse = Document & {
    jobStatus: "pending" | "processing" | "completed" | "failed";
    templateId: string;
}

export type DownloadDocumentResponse = {
    presignedUrl: string;
}