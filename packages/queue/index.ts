import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: null,
});
export const certificateQueue = new Queue("certificates", { connection });

export const batchQueue = new Queue("finalizer", { connection });

export const webhookQueue = new Queue("webhook", { connection });