import { Worker } from "bullmq";
import IORedis from "ioredis";
import { db } from "@certjs/db"
import { documents, jobs } from "@certjs/db/schema"
import { and, eq } from "drizzle-orm";
import { Profiler } from "../utils/profiler";
import { enqueueWebhookQueue } from "../webhook-queue";

export type Entry = Record<string, string | number>;

type Semantics = {
        deliveries: {
            channel: "email" | "webhook";
            scope: "recipient" | "batch";
            destination: string[];
            content: {
                sender: string | null;
                subject: string;
                body: string;
                data?: Entry[] | null;
            } | null;
        }[],
        identification: {
            fields: string[];
            separator?: string; // default " "
            case?: "lower" | "upper" | "preserve"; // default "preserve"
            collision?: "prefix" | "suffix"; // default "suffix"
            docId?: boolean; // default false
        },
        dashboardPersistence: boolean;
    }

export const DelivaryWorker = new Worker("delivery", async (job) => {
    const { documentId, jobId } = job.data;

    const [batchJob] = await db.select().from(jobs).where(eq(jobs.id, jobId));

    const certificateBuffer = // storage

    if(!batchJob) {
        throw new Error("batch job not found");
    }

    const semantics: Semantics = batchJob?.semantics as Semantics; // because db feild is unknown type

    for(const delivery of semantics.deliveries) {
        if(delivery.scope === "batch") {
            enqueueZipQueue(documentId, jobId);
        }

        else if(delivery.channel === "email") {
            for(const mail of delivery.destination) {
                // sender, reciver, subject, body, attachment
                enqueueEmailQueue(certificateBuffer, delivery.content?.sender, delivery.content?.body, delivery.content?.subject, mail)
            }
        }

        else if(delivery.channel === "webhook") {
            for(const webhook of delivery.destination) {
                // attachment, webhook
                enqueueWebhookQueue(certificateBuffer, webhook)
            }
        }
    }
});