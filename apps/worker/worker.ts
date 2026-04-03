import { Worker } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis({
    host: "127.0.0.1",
    port: 6379,
});

const worker = new Worker( "certificates", async (job) => {
    console.log("Processing job:", job.name, job.data);

    if (job.name === "generate_document") {
        // TEMP LOGIC
        console.log("Generating document:", job.data.documentId);
    }
  }, { connection, concurrency: 5 }
);