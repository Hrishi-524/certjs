import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { users } from "./index";
import { oauthProviderEnum } from "./enum";

/*
id
user_id
provider              // "google"
provider_account_id   // Google sub
email
created_at
updated_at
*/

export const oauth_accounts = pgTable("oauth_accounts", {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: uuid("id").notNull().references(() => users.id),
    provider: oauthProviderEnum("provider").notNull(),
    provider_account_id: text("provider_account_id").notNull(),
    email: text("email").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull()
});