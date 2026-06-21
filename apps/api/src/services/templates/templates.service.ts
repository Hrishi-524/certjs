import { templates } from "@certjs/db/schema/templates"
import { db, users } from "@certjs/db/index";
import { eq, desc, and } from "drizzle-orm";
import { NotFoundError } from "@/middleware/express-errors";

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

    return templatesList;
}

export async function deleteTemplateById(templateId: string, userId: string){
    await db.delete(templates).where(
        and(
            eq(templates.id, templateId),
            eq(templates.user_id, userId)
        )
    );
}

export async function updateTemplateById(templateId: string, userId: string) {
    await db.update(templates).set({

    })
}

export async function updateTemplateNameService( templateId: string, userId: string, name: string ) {
    const [template] = await db.update(templates).set({
        name
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
        is_active: false
    }).where(
        and(
            eq(templates.id, templateId),
            eq(templates.user_id, userId)
        )
    ).returning();

    return template;
}