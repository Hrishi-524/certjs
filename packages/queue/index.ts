import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis({
    host: "127.0.0.1", // local Redis server
    port: 6379,
});

export const certificateQueue = new Queue("certificates", { connection });