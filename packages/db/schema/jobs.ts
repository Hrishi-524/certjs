import { pgTable, uuid, text, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
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
    ideompotency_key: text("ideompotency_key").notNull().unique(),
    user_id: uuid("user_id").notNull().references(() => users.id),
    template_id: uuid("template_id").notNull().references(() => templates.id),
    status: statusEnum("status").notNull().default("queued"),
    attempts: integer("attempts").notNull().default(0),
    max_attempts: integer("max_attempts").notNull().default(3),
    last_error: text("last_error"),
    failed_at: timestamp("failed_at"),
    total_count: integer("total_count").notNull(),
    processed_count: integer("processed_count").notNull(),
    zip_s3_url: text("zip_s3_url"),
    webhook_url: text("webhook_url"),
    created_at: timestamp("created_at").defaultNow().notNull(),
    completed_at: timestamp("completed_at")
})