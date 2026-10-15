import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: null,
});

export const certificateQueue = new Queue("certificates", {
    connection,
});

export const deliveryQueue = new Queue("delivery", {
    connection,
});

export const emailQueue = new Queue("email", {
    connection,
});

export const webhookQueue = new Queue("webhook", {
    connection,
});

export const batchQueue = new Queue("batch", {
    connection,
});

export const zipQueue = new Queue("zip", {
    connection,
});