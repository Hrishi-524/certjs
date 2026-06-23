ALTER TABLE "jobs" ALTER COLUMN "processed_count" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "webhook_secret" text;