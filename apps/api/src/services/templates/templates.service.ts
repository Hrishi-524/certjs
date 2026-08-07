import { db, placeholders, templates } from "@certjs/db/index";
import { eq, desc, and } from "drizzle-orm";
import { NotFoundError } from "#app/middleware/express-errors";
import generatePresignedUrl from "#app/services/documents/get-signed-url";
import { getKeyForS3Url } from "#app/services/templates/get-key";
import { deleteS3Object } from "#app/services/templates/storage.service";

export async function createTemplate(template_id: string, s3_url: string, userId: string, name: string, width: number, height: number) {
    const [template] = await db.insert(templates).values({ 
        id: template_id,
        user_id: userId,
        name: name,
        width: width,
        height: height,
        s3_url: s3_url
    }).returning();

    return template;
};

export async function getTemplateById(templateId: string, userId: string) {
    const [template] = await db.select().from(templates).where(
        and(
            eq(templates.id, templateId), 
            eq(templates.user_id, userId)
        )
    );

    return template;
}

export async function getAllTemplates(userId: string) {
    const templatesList = await db.select().from(templates).where(
        eq(templates.user_id, userId)
    ).orderBy(
        desc(templates.created_at)
    );

    
   const normalizedTemplatesList = await Promise.all(
        templatesList.map(async (template) => {
            const key = getKeyForS3Url(template.s3_url);
            const presignedUrl = await generatePresignedUrl(key);

            return {
                templateId: template.id,
                userId: template.user_id,
                name: template.name,
                presignedUrl,
                version: template.version,
                isActive: template.is_active,
                width: template.width,
                height: template.height,
                createdAt: template.created_at,
                updatedAt: template.updated_at,
            };
        })
    );

    return normalizedTemplatesList;
}

export async function deleteTemplateById(templateId: string, userId: string){
    const [template] = await db.select().from(templates).where(
        and(
            eq(templates.id, templateId),
            eq(templates.user_id, userId)
        )
    );

    if (!template) throw new NotFoundError("Template not found");

    const key = getKeyForS3Url(template.s3_url);
    await deleteS3Object(key);

    await db.transaction(async (tx) => {
        await tx.delete(placeholders).where(
            eq(placeholders.template_id, templateId)
        );

        await tx.delete(templates).where(
            and(
                eq(templates.id, templateId),
                eq(templates.user_id, userId)
            )
        );
    });
}

export async function updateTemplateNameService( templateId: string, userId: string, name: string ) {
    const [template] = await db.update(templates).set({
        name,
        updated_at: new Date()
    }).where(
        and(
            eq(templates.id, templateId),
            eq(templates.user_id, userId),
            eq(templates.is_active, true)
        )
    ).returning();

    if (!template) {
        throw new NotFoundError("Template not found");
    }

    return template;
}

export async function deactivateTemplateService(templateId: string, userId: string) {
    const [template] = await db.update(templates).set({
        is_active: false,
        updated_at: new Date()
    }).where(
        and(
            eq(templates.id, templateId),
            eq(templates.user_id, userId)
        )
    ).returning()

    if(!template) {
        throw new NotFoundError("Template not found");
    }

    return;
}

export async function activateTemplateService(templateId: string, userId: string) {
    const [template] = await db.update(templates).set({
        is_active: true,
        updated_at: new Date()
    }).where(
        and(
            eq(templates.id, templateId),
            eq(templates.user_id, userId)
        )
    ).returning();

    if (!template) {
        throw new NotFoundError("Template not found");
    }

    return;
}