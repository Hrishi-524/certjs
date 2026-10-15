import { pgTable, uuid, text, integer, unique, real, index } from "drizzle-orm/pg-core";
import { templates } from "./templates"
import { placeholderStartergyEnum, placeholderTextAlignEnum, placeholderTypeEnum } from "./enum";

export const placeholders = pgTable("placeholders", {
    id: uuid("id").defaultRandom().primaryKey(),
    templateId: uuid("template_id").notNull().references(() => templates.id),
    name: text("name").notNull(),
    key: text("key").notNull(),
    type: placeholderTypeEnum("type").$default(() => "text").notNull(),
    x: real("x").notNull(),
    y: real("y").notNull(),
    width: real("width").notNull(),
    height: real("height").notNull(),
    strategy: placeholderStartergyEnum("strategy").default("shrink").notNull(), // "shrink" | "ellipsis" | "wrap"
    minFontSize: integer("min_font_size"),
    align: placeholderTextAlignEnum("align").notNull().default("left"),
    fontSize: integer("font_size").notNull(),
    fontColor: text("font_color").notNull(),
    fontFamily: text("font_family").notNull()
}, (table) => [
    unique("template_key_unique").on(table.templateId, table.key),
    index("placeholders_template_id_index").on(table.templateId)
]);