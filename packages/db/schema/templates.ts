import { pgTable, uuid, text, timestamp, integer, boolean, index } from "drizzle-orm/pg-core";
import { users } from "./users"

export const templates = pgTable("templates", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull().references(() => users.id),
    name: text("name").notNull(),
    storageKey: text("storage_key").notNull(),
    version: integer("version").notNull().default(1),
    isActive: boolean("is_active").notNull().default(true), 
    width: integer("width"),
    height: integer("height"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
    index("templates_user_id_index").on(table.userId)
]);