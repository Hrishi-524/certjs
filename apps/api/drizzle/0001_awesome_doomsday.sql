ALTER TABLE "jobs" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "status" SET DEFAULT 'pending';