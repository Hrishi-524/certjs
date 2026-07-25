"use client";

import { useQuery } from "@tanstack/react-query";
import { listBatchJobDocuments } from "@/lib/api/jobs";

export function useBatchJobDocuments(jobId: string) {
    return useQuery({
        queryKey: ["batch-job-documents", jobId],
        queryFn: () => listBatchJobDocuments(jobId),
        enabled: !!jobId,
    });
}