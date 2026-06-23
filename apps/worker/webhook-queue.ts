import { webhookQueue } from "@certjs/queue";

export async function enqueueWebhookQueue(batchJobId: string ) {
    await webhookQueue.add(
        "webhook_job",
        {
            batchJobId
        },
        {
            jobId: `webhook-${batchJobId}`,
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