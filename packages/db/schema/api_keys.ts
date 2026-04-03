import {integer,  pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

/*
api_keys schema:
id, rate_limit, user_id (FK), key_hash, name, created_at, lastused_at
*/

export const apikeys = pgTable("apikeys", {
    id: uuid("id").defaultRandom().primaryKey(),
    rate_limit: integer("rate_limit").notNull().default(1000),
    user_id: uuid("user_id").notNull().references(() => users.id),
    key_hash: text("key_hash").notNull(),
    name: text("name").notNull(),
    created_at: timestamp("created_at").notNull(),
    lastused_at: timestamp("lastused_at").notNull()
})