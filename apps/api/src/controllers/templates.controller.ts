import type { Request, Response, NextFunction } from "express";
import type { IdParam } from "@/controllers/types";
import { getTemplateById, getAllTemplates, deleteTemplateById, createTemplate, updateTemplateNameService, deactivateTemplateService } from "@/services/templates/templates.service";
import { uploadTemplateImage } from "@/services/templates/storage.service";
import crypto from "crypto";
import { BadRequestError, NotFoundError } from "@/middleware/express-errors";
import { createTemplateSchema, templateIdParamSchema, updateTemplateSchema } from "@/schema/templates.schema";

export const uploadTemplate = async (req: Request, res: Response) => {
    if (!req.file) {
        throw new BadRequestError("Template file is required")
    }

    const userId = req.user!.id;
    const template_id = crypto.randomUUID()
   
    const { name, width, height } = createTemplateSchema.parse(req.body);

    const { key, url }= await uploadTemplateImage(
        req.file.buffer,
        req.file.mimetype,
        userId,
        template_id
    );
    
    const template = await createTemplate(template_id, url, userId, name, width, height);

    res.status(201).json({
        template_id: template.id,
        user_id: template.user_id,
        s3_key: key,
        s3_url: url,
        name: template.name,
        width: template.width,
        height: template.height,
        created_at: template.created_at
    });
};

export async function getTemplate(req: Request<IdParam>, res: Response, next: NextFunction) {
    const { id: templateId } = templateIdParamSchema.parse(req.params);
    const userId = req.user!.id;

    const template = await getTemplateById(templateId, userId);

    if (!template) {
        throw new NotFoundError("Template not found");
    }

    res.status(200).json({
        template_id: template.id,
        user_id: template.user_id,
        s3_url: template.s3_url,
        name: template.name,
        width: template.width,
        height: template.height,
        created_at: template.created_at
    });
}

export async function getTemplates(req: Request, res: Response, next: NextFunction) {
    const userId = req.user!.id

    const templates = await getAllTemplates(userId);

    res.status(200).json(
        templates
    );
}

export async function deleteTemplate(req: Request<IdParam>, res: Response, next: NextFunction) {
    const { id: templateId } = templateIdParamSchema.parse(req.params)
    const userId = req.user!.id

    await deleteTemplateById(templateId, userId);

    res.status(204).end();
}

export async function updateTemplateName(req: Request<IdParam>, res: Response, next: NextFunction) {
    const { id: templateId } = templateIdParamSchema.parse(req.params)
    const { name } = updateTemplateSchema.parse(req.body)
    const userId = req.user!.id

    const template = await updateTemplateNameService(templateId, userId, name)

    return res.status(200).json({
        template_id: template.id,
        user_id: template.user_id,
        s3_url: template.s3_url,
        name: template.name,
        width: template.width,
        height: template.height,
        created_at: template.created_at
    })
}

export async function deactivateTemplate(req: Request<IdParam>, res: Response, next: NextFunction) {
    const { id: templateId } = templateIdParamSchema.parse(req.params)
    const userId = req.user!.id

    const template = await deactivateTemplateService(templateId, userId)

    return res.status(200).json({
        template_id: template.id,
        user_id: template.user_id,
        s3_url: template.s3_url,
        name: template.name,
        width: template.width,
        height: template.height,
        created_at: template.created_at
    })
}