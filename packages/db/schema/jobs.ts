import { pgTable, uuid, text, timestamp, integer, index, unique } from "drizzle-orm/pg-core";
import { users } from "./users"
import { templates } from "./templates"
import { jsonb } from "drizzle-orm/pg-core";
import { jobStatusEnum, jobTypeEnum } from "./enum";
import type { JobSemantics } from "../types";

export const jobs = pgTable("jobs", {
    id: uuid("id").defaultRandom().primaryKey(),
    jobType: jobTypeEnum("job_type").notNull(),
    idempotencyKey: text("idempotency_key").notNull(),
    userId: uuid("user_id").notNull().references(() => users.id),
    templateId: uuid("template_id").notNull().references(() => templates.id),
    status: jobStatusEnum("status").notNull().default("pending"),
    retryCount : integer("retry_count").notNull().default(0),
    maxRetries: integer("max_retries").notNull().default(3),
    lastError: text("last_error"),
    failedAt: timestamp("failed_at"),
    totalCount: integer("total_count").notNull(),
    processedCount: integer("processed_count").notNull().default(0),
    failedCount: integer("failed_count").notNull().default(0),
    zipKey: text("zip_key"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    completedAt: timestamp("completed_at"),
    semantics: jsonb("semantics").$type<JobSemantics>()
}, 
(table) => [
    unique("jobs_user_idempotency_unique").on(
        table.userId,
        table.idempotencyKey
    ),
    index("jobs_user_id_index").on(table.userId),
])