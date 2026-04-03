import { pgTable, uuid, text, integer, numeric } from "drizzle-orm/pg-core";
import { templates } from "./templates"

/*
placeholders schema:
id, template_id (FK), name, x, y, width, strategy, min_font_size, align, font_size, font_color, font_family
*/
export const placeholders = pgTable("placeholders", {
    id: uuid("id").defaultRandom().primaryKey(),
    template_id: uuid("template_id").notNull().references(() => templates.id),
    name: text("name").notNull(),
    x: numeric("x", { precision: 10, scale: 2 }).notNull(),
    y: numeric("y", { precision: 10, scale: 2 }).notNull(),
    key: text("key").notNull(),
    width: numeric("width", { precision: 10, scale: 2 }).notNull(),
    strategy: text("strategy", { enum: ["shrink", "ellipsis", "wrap"] }).default("shrink").notNull(), // "shrink" | "ellipsis" | "wrap"
    min_font_size: integer("min_font_size"),
    align: text("align", { enum: ["left", "center", "right"] }).notNull().default("left"),
    font_size: integer("font_size").notNull(),
    font_color: text("font_color").notNull(),
    font_family: text("font_family").notNull(),
    height: integer("height").notNull(), // Later Implemenation for text wrapping
    // line_height: numeric("line_height"), // Later Implementation for text wrapping
})