ALTER TABLE "documents" RENAME COLUMN "s3_url" TO "storage_key";--> statement-breakpoint
ALTER TABLE "jobs" RENAME COLUMN "zip_s3_url" TO "zip_key";--> statement-breakpoint
ALTER TABLE "templates" RENAME COLUMN "s3_url" TO "storage_key";