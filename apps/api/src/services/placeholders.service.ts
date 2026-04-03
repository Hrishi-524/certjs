import { db } from "@certjs/db/index";
import { placeholders } from "@certjs/db/schema/placeholders";
import { eq } from "drizzle-orm";

export const createPlaceholders = async (
    template_id: string,
    items: Array<{
        name: string, x: number, y: number,
        font_size: number, font_color: string, font_family: string
    }>
) => {
    const rows = items.map(item => ({ template_id, ...item }));
    const result = await db.insert(placeholders).values(rows).returning();
    return result;
}

export const getPlaceholdersByTemplateId = async (template_id: string) => {
    const placeholdersList = await db.select().from(placeholders).where(eq(placeholders.template_id, template_id));
    return placeholdersList;
}
