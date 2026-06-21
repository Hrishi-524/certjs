ALTER TABLE "apikeys" RENAME COLUMN "lastused_at" TO "last_used_at";--> statement-breakpoint
ALTER TABLE "apikeys" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "apikeys" ADD COLUMN "key_prefix" text NOT NULL;--> statement-breakpoint
ALTER TABLE "apikeys" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "apikeys" ADD COLUMN "expires_at" timestamp;--> statement-breakpoint
CREATE INDEX "api_keys_user_id_index" ON "apikeys" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "documents_job_id_index" ON "documents" USING btree ("job_id");--> statement-breakpoint
CREATE INDEX "jobs_user_id_index" ON "jobs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "placeholders_template_id_index" ON "placeholders" USING btree ("template_id");--> statement-breakpoint
CREATE INDEX "templates_user_id_index" ON "templates" USING btree ("user_id");--> statement-breakpoint
ALTER TABLE "apikeys" ADD CONSTRAINT "apikeys_key_hash_unique" UNIQUE("key_hash");--> statement-breakpoint
ALTER TABLE "placeholders" ADD CONSTRAINT "template_key_unique" UNIQUE("template_id","key");