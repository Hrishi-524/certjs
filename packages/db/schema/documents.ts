import { pgTable, uuid, text, timestamp, jsonb, index } from "drizzle-orm/pg-core";
import { jobs } from "./jobs"
import type { Entry } from "../types";

export const documents = pgTable("documents", {
    id: uuid("id").defaultRandom().primaryKey(),
    jobId: uuid("job_id").notNull().references(() => jobs.id),
    recipientData: jsonb("recipient_data").$type<Entry>().notNull(),
    status: text("status", { enum: ["pending", "processing", "completed", "failed"] }).notNull().default("pending"),
    error: text("error"),
    verifyToken: text("verify_token").notNull(),
    storageKey: text("storage_key"),
    fileName: text("file_name"),
    createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => [
    index("documents_job_id_index").on(table.jobId),
    index("documents_verify_token_index").on(table.verifyToken)
]);