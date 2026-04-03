import { pgEnum } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("job_status", ["queued", "processing", "done", "failed"]);