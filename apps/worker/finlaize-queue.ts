import { batchQueue } from "@certjs/queue/index";

export async function enqueueFinalizeQueue(batch_job_id: string ) {
    await batchQueue.add(
        "finalize_batch",
        {
            job_id: batch_job_id
        },
        {
            jobId: `finalize:${batch_job_id}`
        }
    )
}