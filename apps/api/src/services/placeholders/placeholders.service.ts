import { db } from "@certjs/db/index";
import { placeholders } from "@certjs/db/schema/placeholders";
import { eq, inArray } from "drizzle-orm";
import type { CreatePlaceholdersInput, DeletePlaceholderInput, UpdatePlaceholderInput } from "#app/schema/placeholders.schema";
import type { Placeholder } from "#app/types/placeholder-types";
import { NotFoundError } from "#app/middleware/express-errors";
import { templates } from "@certjs/db/schema/templates";
import { convertToCamelCase } from "#app/utils/object-case-conversions";

export async function syncPlaceholdersService(templateId: string, items: CreatePlaceholdersInput) {
    const [template] = await db.select().from(templates).where(
        eq(templates.id, templateId)
    );

    if(!template) {
        throw new NotFoundError("Template not found");
    }

    const existingPlaceholders: Placeholder[] = await db.select().from(placeholders).where(
        eq(placeholders.templateId, templateId)
    );

    const existingPlaceholdersMap = new Map(existingPlaceholders.map(ph => [ph.key, ph]));

    const itemsToUpdate: UpdatePlaceholderInput = [];
    const itemsToCreate: CreatePlaceholdersInput = [];
    let itemsToDelete: DeletePlaceholderInput = [];

    for(const item of items) {
        if(existingPlaceholdersMap.has(item.key)) {
            const existingPlaceholder = existingPlaceholdersMap.get(item.key)!;

            const update: Record<string, unknown> = {};
            for (const [k, v] of Object.entries(item)) {
                if (existingPlaceholder[k as keyof typeof existingPlaceholder] !== v) {
                    update[k] = v;
                }
            }

            if(Object.keys(update).length !== 0) {
                itemsToUpdate.push({templateId: existingPlaceholder.templateId, placeholderId: existingPlaceholder.id, ...update})
            }

            existingPlaceholdersMap.delete(item.key)
        } else {
            itemsToCreate.push(item);
        }
    };

    itemsToDelete = Array.from(existingPlaceholdersMap.values()).map(ph => ({
        templateId: ph.templateId,
        placeholderId: ph.id
    }));

    await db.transaction(async (tx) => {
        if (itemsToCreate.length) {
            await tx.insert(placeholders).values(
                itemsToCreate.map(item => ({ ...item, templateId }))
            );
        }

        for (const item of itemsToUpdate) {
            const { placeholderId, templateId, ...update } = item;

            await tx
                .update(placeholders)
                .set(update as Partial<typeof placeholders.$inferInsert>)
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

        await tx.update(templates).set({ updatedAt: new Date() }).where(eq(templates.id, templateId));
    });

    return getPlaceholdersByTemplateId(templateId);
}


export async function createPlaceholders(
    templateId: string,
    items: CreatePlaceholdersInput
) {
    const inserted = await db.insert(placeholders).values(
        items.map(item => ({ ...item, templateId }))
    ).returning();

    return inserted;
}

export async function getPlaceholdersByTemplateId(templateId: string) {
    const placeholdersList: Placeholder[] = await db.select().from(placeholders).where(
        eq(placeholders.templateId, templateId)
    );

    return placeholdersList;
}

export async function updatePlaceholder(
    templateId: string,
    placeholderId: string,
    data: Partial<CreatePlaceholdersInput[number]>
) {

    const [placeholder] = await db.select().from(placeholders).where(
        eq(placeholders.id, placeholderId)
    );

    if(!placeholder) {
        throw new Error("Placeholder not found");
    }
    
    if(placeholder.templateId !== templateId) {
        throw new Error("Unauthorized to update this placeholder");
    }

    const [updated] = await db.update(placeholders).set(data).where(
        eq(placeholders.id, placeholderId)
    ).returning();

    if (!updated) {
        throw new NotFoundError("Placeholder not found");
    }

    const camelUpdated = convertToCamelCase(updated)

    return camelUpdated
}

export async function deletePlaceholder(placeholderId: string) {
    await db.delete(placeholders).where(
        eq(placeholders.id, placeholderId)
    );
}
