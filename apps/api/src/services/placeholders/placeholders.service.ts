import { db } from "@certjs/db/index";
import { placeholders } from "@certjs/db/schema/placeholders";
import { eq, inArray } from "drizzle-orm";
import { CreatePlaceholdersInput, DeletePlaceholderInput, UpdatePlaceholderInput } from "#app/schema/placeholders.schema";
import type { Placeholder, PlaceholderUpdateData } from "#app/types/placeholder-types";
import { NotFoundError } from "#app/middleware/express-errors";
import type { Template } from "#app/types/templates-types";
import { templates } from "@certjs/db/schema/templates";
import { convertToCamelCase, convertToSnakeCase } from "#app/utils/object-case-conversions";

export async function syncPlaceholdersService(templateId: string, items: CreatePlaceholdersInput) {
    const [template] = await db.select().from(templates).where(
        eq(templates.id, templateId)
    );

    if(!template) {
        throw new NotFoundError("Template not found");
    }

    const existingPlaceholders: Placeholder[] = await db.select().from(placeholders).where(
        eq(placeholders.template_id, templateId)
    );

    const existingPlaceholdersMap = new Map(existingPlaceholders.map(ph => [ph.key, ph]));

    const itemsToUpdate: UpdatePlaceholderInput = [];
    const itemsToCreate: CreatePlaceholdersInput = [];
    let itemsToDelete: DeletePlaceholderInput = [];

    for(const item of items) {
        if(existingPlaceholdersMap.has(item.key)) {
            const existingPlaceholder = existingPlaceholdersMap.get(item.key)!;

            const existing = {
                id: existingPlaceholder.id,
                templateId: existingPlaceholder.template_id,
                name: existingPlaceholder.name,
                key: existingPlaceholder.key,
                x: existingPlaceholder.x,
                y: existingPlaceholder.y,
                width: existingPlaceholder.width,
                height: existingPlaceholder.height,
                fontSize: existingPlaceholder.font_size,
                fontColor: existingPlaceholder.font_color,
                fontFamily: existingPlaceholder.font_family,
                strategy: existingPlaceholder.strategy,
                align: existingPlaceholder.align,
                minFontSize: existingPlaceholder.min_font_size,
            };

            const update: Record<string, unknown> = {};
            for (const [k, v] of Object.entries(item)) {
                if (existing[k as keyof typeof existing] !== v) {
                    update[k] = v;
                }
            }

            if(Object.keys(update).length !== 0) {
                itemsToUpdate.push({templateId: existingPlaceholder.template_id, placeholderId: existingPlaceholder.id, ...update})
            }

            existingPlaceholdersMap.delete(item.key)
        } else {
            itemsToCreate.push(item);
        }
    };

    itemsToDelete = Array.from(existingPlaceholdersMap.values()).map(ph => ({
        templateId: ph.template_id,
        placeholderId: ph.id
    }));

    await db.transaction(async (tx) => {
        if (itemsToCreate.length) {
            await tx.insert(placeholders).values(
                itemsToCreate.map(item => ({
                    template_id: templateId,
                    name: item.name,
                    key: item.key,
                    x: item.x,
                    y: item.y,
                    width: item.width,
                    height: item.height,
                    strategy: item.strategy,
                    min_font_size: item.minFontSize,
                    align: item.align,
                    font_size: item.fontSize,
                    font_color: item.fontColor,
                    font_family: item.fontFamily,
                }))
            );
        }

        for (const item of itemsToUpdate) {
            const { placeholderId, templateId, ...update } = item;

            const dataToUpdate = convertToSnakeCase(update);

            await tx
                .update(placeholders)
                .set(dataToUpdate)
                .where(eq(placeholders.id, placeholderId));
        }

        if (itemsToDelete.length) {
            await tx
                .delete(placeholders)
                .where(
                    inArray(
                        placeholders.id,
                        itemsToDelete.map(item => item.placeholderId)
                    )
                );
        }

        await db.update(templates).set({ updated_at: new Date() }).where(eq(templates.id, templateId))
    });

    return getPlaceholdersByTemplateId(templateId);
}


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
        type: item.type,
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
        type: item.type,
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

export async function updatePlaceholder(template_id: string, placeholder_id: string, data: UpdatePlaceholderInput) {
    const snakeData: PlaceholderUpdateData = convertToSnakeCase(data)

    const [placeholder] = await db.select().from(placeholders).where(
        eq(placeholders.id, placeholder_id)
    );

    if(!placeholder) {
        throw new Error("Placeholder not found");
    }
    
    if(placeholder.template_id !== template_id) {
        throw new Error("Unauthorized to update this placeholder");
    }

    const [updated] = await db.update(placeholders).set(snakeData).where(
        eq(placeholders.id, placeholder_id)
    ).returning();

    if (!updated) {
        throw new NotFoundError("Placeholder not found");
    }

    const camelUpdated = convertToCamelCase(updated)

    return camelUpdated
}

export async function deletePlaceholder(placeholder_id: string) {
    await db.delete(placeholders).where(
        eq(placeholders.id, placeholder_id)
    );
}
