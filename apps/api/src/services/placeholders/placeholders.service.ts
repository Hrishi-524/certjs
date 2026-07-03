import { db } from "@certjs/db/index";
import { placeholders } from "@certjs/db/schema/placeholders";
import { eq } from "drizzle-orm";
import { CreatePlaceholdersInput } from "@/schema/placeholders.schema";
import type { Placeholder, PlaceholderUpdateData } from "@/types/placeholder-types";
import { NotFoundError } from "@/middleware/express-errors";

export async function createPlaceholders(
    templateId: string,
    items: CreatePlaceholdersInput
) {
    const snakeRows = items.map(item => ({
        template_id: templateId,
        name: item.name,
        x: item.x,
        y: item.y,
        key: item.key,
        width: item.width,
        font_size: item.fontSize,
        font_color: item.fontColor,
        font_family: item.fontFamily,
        height: item.height,
        strategy: item.strategy,
        min_font_size: item.minFontSize,
        align: item.align
    }));

    const inserted = await db.insert(placeholders).values(snakeRows).returning();

    const normalizedInserted = inserted.map(item => ({
        id: item.id,
        templateId: item.template_id,
        name: item.name,
        x: item.x,
        y: item.y,
        key: item.key,
        width: item.width,
        fontSize: item.font_size,
        fontColor: item.font_color,
        fontFamily: item.font_family,
        height: item.height,
        strategy: item.strategy,
        minFontSize: item.min_font_size,
        align: item.align
    }));

    return normalizedInserted;
}

export async function getPlaceholdersByTemplateId(template_id: string) {
    const placeholdersList: Placeholder[] = await db.select().from(placeholders).where(
        eq(placeholders.template_id, template_id)
    );

    const normalizedPlaceholdersList = placeholdersList.map(item => ({
        id: item.id,
        templateId: item.template_id,
        name: item.name,
        x: item.x,
        y: item.y,
        key: item.key,
        width: item.width,
        fontSize: item.font_size,
        fontColor: item.font_color,
        fontFamily: item.font_family,
        height: item.height,
        strategy: item.strategy,
        minFontSize: item.min_font_size,
        align: item.align
    }));

    return normalizedPlaceholdersList;
}

export async function updatePlaceholder(template_id: string, placeholder_id: string, data: PlaceholderUpdateData) {
    const [placeholder] = await db.select().from(placeholders).where(
        eq(placeholders.id, placeholder_id)
    );

    if(!placeholder) {
        throw new Error("Placeholder not found");
    }
    
    if(placeholder.template_id !== template_id) {
        throw new Error("Unauthorized to update this placeholder");
    }

    const [updated] = await db.update(placeholders).set(data).where(
        eq(placeholders.id, placeholder_id)
    ).returning();

    if (!updated) {
        throw new NotFoundError("Placeholder not found");
    }

    const normalizedUpdated = {
        id: updated.id,
        templateId: updated.template_id,
        name: updated.name,
        x: updated.x,
        y: updated.y,
        key: updated.key,
        width: updated.width,
        fontSize: updated.font_size,
        fontColor: updated.font_color,
        fontFamily: updated.font_family,
        height: updated.height,
        strategy: updated.strategy,
        minFontSize: updated.min_font_size,
        align: updated.align
    };

    return normalizedUpdated;
}

export async function deletePlaceholder(placeholder_id: string) {
    await db.delete(placeholders).where(
        eq(placeholders.id, placeholder_id)
    );
}
