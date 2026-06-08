import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { users } from "./index";

/**
id
user_id
token_hash
expires_at
revoked_at nullable
created_at
last_used_at nullable
user_agent nullable
ip_address nullable
*/

export const sessions = pgTable("sessions", {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: uuid("user_id").notNull().references(() => users.id),
    token_hash: text("token_hash").notNull().unique(),
    expires_at: timestamp("expires_at").notNull(),
    revoked_at: timestamp("revoked_at"),
    created_at: timestamp("created_at").defaultNow().notNull(),
    last_used_at: timestamp("last_used_at"),
    user_agent: text("user_agent"),
    ip_address: text("ip_address")
});