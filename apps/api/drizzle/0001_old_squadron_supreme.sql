ALTER TABLE "oauth_accounts" DROP CONSTRAINT "oauth_accounts_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "oauth_accounts" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "oauth_accounts" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "oauth_accounts" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "oauth_accounts" ADD CONSTRAINT "oauth_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;