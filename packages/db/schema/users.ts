import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";

/*
users schema:
id
name
username
email
email_verified
password_hash nullable
avatar_url nullable
created_at
updated_at
*/

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    username: text("username").unique().notNull(),
    email: text("email").unique().notNull(),
    email_verified: boolean("email_verified").default(false).notNull(),
    password_hash: text("password_hash"),
    avatar_url: text("avatar_url"),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull()
});