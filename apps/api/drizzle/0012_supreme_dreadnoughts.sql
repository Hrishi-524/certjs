ALTER TABLE "documents" ADD COLUMN "file_name" text;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "semantics" jsonb;--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "webhook_url";--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "webhook_secret";