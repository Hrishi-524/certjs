CREATE INDEX "documents_verify_token_index" ON "documents" USING btree ("verify_token");--> statement-breakpoint
ALTER TABLE "apikeys" ADD CONSTRAINT "apikeys_key_prefix_unique" UNIQUE("key_prefix");