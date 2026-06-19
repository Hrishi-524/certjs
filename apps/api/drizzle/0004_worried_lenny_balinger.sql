ALTER TABLE "documents" ALTER COLUMN "s3_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "retry_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "max_retries" integer DEFAULT 3 NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "failed_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "attempts";--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "max_attempts";