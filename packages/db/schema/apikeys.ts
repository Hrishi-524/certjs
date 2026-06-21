import {integer,  pgTable, uuid, text, timestamp, boolean, index } from "drizzle-orm/pg-core";
import { users } from "./users";

/*
api_keys schema:
id, rate_limit, user_id (FK), key_hash, name, created_at, last_used_at, is_active
*/

export const apikeys = pgTable("apikeys", {
    id: uuid("id").defaultRandom().primaryKey(),
    rate_limit: integer("rate_limit").notNull().default(1000),
    user_id: uuid("user_id").notNull().references(() => users.id),
    key_hash: text("key_hash").notNull().unique(),
    key_prefix: text("key_prefix").notNull(),
    name: text("name").notNull(),
    is_active: boolean("is_active").notNull().default(true),
    created_at: timestamp("created_at").defaultNow().notNull(),
    last_used_at: timestamp("last_used_at"),
    expires_at: timestamp("expires_at")
}, (table) => [
    index("api_keys_user_id_index").on(table.user_id)
]);