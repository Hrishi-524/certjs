"use client"

import { useQuery } from "@tanstack/react-query"
import { getJobs } from "@/lib/api/jobs"
import { GetJobsResponse } from "@/types/jobs.types"

export default function useJobs()  {
    return useQuery<GetJobsResponse>({
        queryKey: ["jobs"],
        queryFn: getJobs,
        staleTime: 30*1000,
    })
}