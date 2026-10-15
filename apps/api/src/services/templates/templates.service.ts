import { db, placeholders, templates } from "@certjs/db/index";
import { eq, desc, and } from "drizzle-orm";
import { NotFoundError } from "#app/middleware/express-errors";
import { storage } from "@certjs/storage";
import { deleteStoredObject } from "#app/services/templates/storage.service";

export async function createTemplate(templateId: string, storageKey: string, userId: string, name: string, width: number, height: number) {
    const [template] = await db.insert(templates).values({ 
        id: templateId,
        userId,
        name,
        width,
        height,
        storageKey
    }).returning();

    return template;
};

export async function getTemplateById(templateId: string, userId: string) {
    const [template] = await db.select().from(templates).where(
        and(
            eq(templates.id, templateId), 
            eq(templates.userId, userId)
        )
    );

    return template;
}

export async function getAllTemplates(userId: string) {
    const templatesList = await db.select().from(templates).where(
        eq(templates.userId, userId)
    ).orderBy(
        desc(templates.createdAt)
    );

    
    const downloadableTemplates = await Promise.all(
        templatesList.map(async (template) => {
            const presignedUrl = await storage.getSignedUrl(template.storageKey);

            return {
                ...template, 
                presignedUrl
            };
        })
    );

    return downloadableTemplates;
}

export async function deleteTemplateById(templateId: string, userId: string){
    const [template] = await db.select().from(templates).where(
        and(
            eq(templates.id, templateId),
            eq(templates.userId, userId)
        )
    );

    if (!template) throw new NotFoundError("Template not found");

    await deleteStoredObject(template.storageKey);

    await db.transaction(async (tx) => {
        await tx.delete(placeholders).where(
            eq(placeholders.templateId, templateId)
        );

        await tx.delete(templates).where(
            and(
                eq(templates.id, templateId),
                eq(templates.userId, userId)
            )
        );
    });
}

export async function updateTemplateNameService( templateId: string, userId: string, name: string ) {
    const [template] = await db.update(templates).set({
        name,
        updatedAt: new Date()
    }).where(
        and(
            eq(templates.id, templateId),
            eq(templates.userId, userId),
            eq(templates.isActive, true)
        )
    ).returning();

    if (!template) {
        throw new NotFoundError("Template not found");
    }

    return template;
}

export async function deactivateTemplateService(templateId: string, userId: string) {
    const [template] = await db.update(templates).set({
        isActive: false,
        updatedAt: new Date()
    }).where(
        and(
            eq(templates.id, templateId),
            eq(templates.userId, userId)
        )
    ).returning()

    if(!template) {
        throw new NotFoundError("Template not found");
    }

    return;
}

export async function activateTemplateService(templateId: string, userId: string) {
    const [template] = await db.update(templates).set({
        isActive: true,
        updatedAt: new Date()
    }).where(
        and(
            eq(templates.id, templateId),
            eq(templates.userId, userId)
        )
    ).returning();

    if (!template) {
        throw new NotFoundError("Template not found");
    }

    return;
}
