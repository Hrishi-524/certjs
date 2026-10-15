import {integer,  pgTable, uuid, text, timestamp, boolean, index } from "drizzle-orm/pg-core";
import { users } from "./users";

export const apiKeys = pgTable("apikeys", {
    id: uuid("id").defaultRandom().primaryKey(),
    rateLimit: integer("rate_limit").notNull().default(1000),
    userId: uuid("user_id").notNull().references(() => users.id),
    keyHash: text("key_hash").notNull().unique(),
    keyPrefix: text("key_prefix").notNull().unique(),
    name: text("name").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    lastUsedAt: timestamp("last_used_at"),
    expiresAt: timestamp("expires_at")
}, (table) => [
    index("api_keys_user_id_index").on(table.userId)
]);
