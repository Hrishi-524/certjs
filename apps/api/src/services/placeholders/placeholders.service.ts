import { db } from "@certjs/db/index";
import { placeholders } from "@certjs/db/schema/placeholders";
import { eq } from "drizzle-orm";
import { CreatePlaceholdersInput } from "@/schema/placeholders.schema";
import type { Placeholder } from "@/types/placeholder-types";
import { NotFoundError } from "@/middleware/express-errors";

export async function createPlaceholders(
    template_id: string,
    items: CreatePlaceholdersInput
) {
    const rows = items.map(item => ({
        template_id,
        ...item
    }));

    const inserted = await db.insert(placeholders).values(rows).returning();
    
    return inserted;
}

export async function getPlaceholdersByTemplateId(template_id: string) {
    const placeholdersList: Placeholder[] = await db.select().from(placeholders).where(
        eq(placeholders.template_id, template_id)
    );

    return placeholdersList;
}

export async function updatePlaceholder(template_id: string, placeholder_id: string, data: Partial<Placeholder>) {
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

    return updated;
}

export async function deletePlaceholder(placeholder_id: string) {
    await db.delete(placeholders).where(
        eq(placeholders.id, placeholder_id)
    );
}
