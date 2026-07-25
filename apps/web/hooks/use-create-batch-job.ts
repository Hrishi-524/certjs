import { useMutation } from '@tanstack/react-query';
import { createBatchJob } from '@/lib/api/jobs';

export function useCreateBatchJob() {
    return useMutation({
        mutationFn: createBatchJob,
    });
}