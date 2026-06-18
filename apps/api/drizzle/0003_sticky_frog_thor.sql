ALTER TABLE "jobs" DROP CONSTRAINT "jobs_idempotency_key_unique";--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_user_idempotency_unique" UNIQUE("user_id","idempotency_key");