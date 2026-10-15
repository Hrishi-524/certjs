import { deliveryQueue } from "@certjs/queue";

export async function enqueueDeliveryQueue(documentId: string, jobId: string) {
    await deliveryQueue.add(
        "delivery",
        {
            documentId,
            jobId
        },
        {
            jobId: `deliver-${documentId}`,
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