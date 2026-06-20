import { pgTable, uuid, text, timestamp, integer, pgEnum, unique } from "drizzle-orm/pg-core";
import { users } from "./users"
import { templates } from "./templates"
import { statusEnum } from "./enum"

/*
jobs schema:
- id (uuid, PK), job_type (text, enum: CERTIFICATE_BATCH), ideompotency_key (text, unique), user_id (uuid, FK to users), template_id (uuid, FK to templates), status (text, enum: queued, processing, completed, failed), attempts (integer), max_attempts (integer), last_error (text), failed_at (timestamp), total_count (integer), processed_count (integer), zip_s3_url (text), webhook_url (text), created_at (timestamp), completed_at (timestamp)   
*/

export const jobs = pgTable("jobs", {
    id: uuid("id").defaultRandom().primaryKey(),
    job_type: text("job_type", { enum: ["CERTIFICATE_BATCH"] }).notNull(),
    idempotency_key: text("idempotency_key").notNull(),
    user_id: uuid("user_id").notNull().references(() => users.id),
    template_id: uuid("template_id").notNull().references(() => templates.id),
    status: text("status", { enum: ["pending", "processing", "completed", "failed"] }).notNull().default("pending"),
    retry_count : integer("retry_count").notNull().default(0),
    max_retries: integer("max_retries").notNull().default(3),
    last_error: text("last_error"),
    failed_at: timestamp("failed_at"),
    total_count: integer("total_count").notNull(),
    processed_count: integer("processed_count").notNull(),
    failed_count: integer("failed_count").notNull().default(0),
    zip_s3_url: text("zip_s3_url"),
    webhook_url: text("webhook_url"),
    created_at: timestamp("created_at").defaultNow().notNull(),
    completed_at: timestamp("completed_at")
}, 
(table) => [
    unique("jobs_user_idempotency_unique").on(
        table.user_id,
        table.idempotency_key
    )
])