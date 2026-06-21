import { pgTable, uuid, text, timestamp, integer, boolean, index } from "drizzle-orm/pg-core";
import { users } from "./users"

/*
templates schema:
id, user_id (FK), name, version, is_active, s3_url, width, height, created_at
*/

export const templates = pgTable("templates", {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: uuid("user_id").notNull().references(() => users.id),
    name: text("name").notNull(),
    s3_url: text("s3_url").notNull(),
    version: integer("version").notNull().default(1),
    is_active: boolean("is_active").notNull().default(true), 
    width: integer("width"),
    height: integer("height"),
    created_at: timestamp("created_at").defaultNow().notNull()
}, (table) => [
    index("templates_user_id_index").on(table.user_id)
]);