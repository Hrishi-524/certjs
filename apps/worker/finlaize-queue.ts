import { batchQueue } from "@certjs/queue";

export async function enqueueFinalizeQueue(batch_job_id: string ) {
    await batchQueue.add(
        "finalize_batch",
        {
            job_id: batch_job_id
        },
        {
            jobId: `finalize-${batch_job_id}`,
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 2000
            },
            removeOnComplete: 1000,
            removeOnFail: 1000
        
        }
    )
}