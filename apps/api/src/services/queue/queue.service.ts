import { certificateQueue } from "@certjs/queue";
import type { Document } from "#app/types/document-types";
import { db } from "@certjs/db";
import { eq } from "drizzle-orm";
import { jobs } from "@certjs/db/schema";

export async function enqueueDocument(documents: Document[], jobId: string) {
    try {
        await Promise.all(documents.map(doc =>
                certificateQueue.add(
                    "generate_document",
                    {
                        document_id: doc.id
                    },
                    {
                        jobId: `document-${doc.id}`,
                        attempts: 3,
                        backoff: {
                            type: "exponential",
                            delay: 2000
                        },
                        removeOnComplete: 1000,
                        removeOnFail: 1000
                    }
                )
            )
        )
    } catch (error) {
        await db.update(jobs).set({
            status: "failed",
            last_error: error instanceof Error ? error.message : "Queue enqueue failed"
        }).where(eq(jobs.id, jobId));

        throw error;
    }
}