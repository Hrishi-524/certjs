import clientApi from "@/lib/api/client";
import { CreateBatchJobInput, CreateBatchJobResponse, DownloadBatchJobDocumentsResponse, GetBatchJobStatusResponse, ListBatchJobDocumentsResponse, RetryFailedDocumentsResponse, PlaygroundPreviewInput } from "@/types/jobs.types";

export async function createBatchJob(input: CreateBatchJobInput): Promise<CreateBatchJobResponse> {
    const { data } = await clientApi.post<CreateBatchJobResponse>("/dashboard/jobs", input);
    return data;
}   

export async function getPlaygroundPreview(input: PlaygroundPreviewInput): Promise<string> {
    const blob = await clientApi.post("/dashboard/playground/preview", input, { responseType: "blob"});
    const previewUrl = URL.createObjectURL(blob.data);
    return previewUrl;
}

export async function getBatchJob(jobId: string): Promise<GetBatchJobStatusResponse> {
    const { data } = await clientApi.get<GetBatchJobStatusResponse>(`/dashboard/jobs/${jobId}`);
    return data;
}

export async function listBatchJobDocuments(jobId: string): Promise<ListBatchJobDocumentsResponse> {
    const { data } = await clientApi.get<ListBatchJobDocumentsResponse>(`/dashboard/jobs/${jobId}/documents`);
    return data;
}

export async function downloadBatchJobDocuments(jobId: string): Promise<DownloadBatchJobDocumentsResponse> {
    const { data } = await clientApi.get<DownloadBatchJobDocumentsResponse>(`/dashboard/jobs/${jobId}/download`);
    return data;
}

export async function retryFailedDocuments(jobId: string): Promise<RetryFailedDocumentsResponse> {
    const { data } = await clientApi.post<RetryFailedDocumentsResponse>(`/dashboard/jobs/${jobId}/retry`);
    return data;
}