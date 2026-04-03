import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

/*
users schema:
id, username, email, password_hash, created_at
*/

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    username: text("username").unique().notNull(),
    email: text("email").unique().notNull(),
    password_hash: text("password_hash").notNull(),
    created_at: timestamp("created_at").notNull()
});