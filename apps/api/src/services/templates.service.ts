import { templates } from "@certjs/db/schema/templates"
import { db } from "@certjs/db/index";
import { eq, desc } from "drizzle-orm";

export const createTemplate = async (template_id: string, s3_url: string, userId: string, name: string, width: number, height: number) => {
    try {
        const [template] = await db.insert(templates).values({ 
            id: template_id,
            s3_url: s3_url,
            user_id: userId,
            name: name,
            width: width,
            height: height
        }).returning();
        return template;
    } catch (error) {
        console.error("DB Error:", error);
        throw error;
    }
};

export const getTemplateById = async (templateId: string) => {
    const [template] = await db.select().from(templates).where(eq(templates.id, templateId));
    return template;
}

export const getAllTemplates = async () => {
    const templatesList = await db.select().from(templates).orderBy(desc(templates.created_at));
    return templatesList;
}

export const deleteTemplateById = async (templateId: string) => {
    await db.delete(templates).where(eq(templates.id, templateId));
}