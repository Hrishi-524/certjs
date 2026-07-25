"use client";

import { useQuery } from "@tanstack/react-query";
import { getBatchJob } from "@/lib/api/jobs";

export function useBatchJob(jobId: string) {
    return useQuery({
        queryKey: ["batch-job", jobId],
        queryFn: () => getBatchJob(jobId),
        enabled: !!jobId,
        // Poll while the job is still running.
        refetchInterval: (query) => {
            const status = query.state.data?.status;

            return status === "processing" || status === "pending" ? 1000 : false;
        },
    });
}