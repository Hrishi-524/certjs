import { pgTable, uuid, text, integer, unique, real, index } from "drizzle-orm/pg-core";
import { templates } from "./templates"

export const placeholders = pgTable("placeholders", {
    id: uuid("id").defaultRandom().primaryKey(),
    template_id: uuid("template_id").notNull().references(() => templates.id),
    name: text("name").notNull(),
    key: text("key").notNull(),
    x: real("x").notNull(),
    y: real("y").notNull(),
    width: real("width").notNull(),
    height: real("height").notNull(),
    strategy: text("strategy", { enum: ["shrink", "ellipsis", "wrap"] }).default("shrink").notNull(), // "shrink" | "ellipsis" | "wrap"
    min_font_size: integer("min_font_size"),
    align: text("align", { enum: ["left", "center", "right"] }).notNull().default("left"),
    font_size: integer("font_size").notNull(),
    font_color: text("font_color").notNull(),
    font_family: text("font_family").notNull()
}, (table) => [
    unique("template_key_unique").on(table.template_id, table.key),
    index("placeholders_template_id_index").on(table.template_id)
]);