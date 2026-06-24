import { batchQueue } from "@certjs/queue";

export async function enqueueFinalizeQueue(batchJobId: string ) {
    await batchQueue.add(
        "finalize_batch",
        {
            batchJobId
        },
        {
            jobId: `finalize-${batchJobId}`,
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