import { Queue } from "bullmq";
import IORedis from "ioredis";


// console.log(process.env.REDIS_URL);
const connection = new IORedis({
    host: "127.0.0.1",
    port: 6379,
    maxRetriesPerRequest: null,
})

export const certificateQueue = new Queue("certificates", { connection });

export const batchQueue = new Queue("finalizer", { connection });

export const webhookQueue = new Queue("webhook", { connection });