import type { Request, Response, NextFunction } from "express";
import type { IdParam } from "@/controllers/types";
import { getTemplateById, getAllTemplates, deleteTemplateById, createTemplate, updateTemplateNameService, deactivateTemplateService } from "@/services/templates/templates.service";
import { uploadTemplateImage } from "@/services/templates/storage.service";
import crypto from "crypto";
import { BadRequestError, NotFoundError } from "@/middleware/express-errors";
import { createTemplateSchema, templateIdParamSchema, updateTemplateSchema } from "@/schema/templates.schema";
import generatePresignedUrl from "@/services/documents/get-signed-url";
import { getKeyForS3Url } from "@/services/templates/get-key";

export const uploadTemplate = async (req: Request, res: Response) => {
    if (!req.file) {
        throw new BadRequestError("Template file is required")
    }

    const userId = req.user!.id;
    const templateId = crypto.randomUUID()
   
    const { name, width, height } = createTemplateSchema.parse(req.body);

    const { key, url }= await uploadTemplateImage(
        req.file.buffer,
        req.file.mimetype,
        userId,
        templateId
    );
    
    const template = await createTemplate(templateId, url, userId, name, width, height);

    res.status(201).json({
        templateId: template.id,
        userId: template.user_id,
        s3Key: key,
        s3Url: url,
        name: template.name,
        width: template.width,
        height: template.height,
        createdAt: template.created_at
    });
};

export async function getTemplate(req: Request<IdParam>, res: Response, next: NextFunction) {
    const { templateId } = templateIdParamSchema.parse(req.params);
    const userId = req.user!.id;

    const template = await getTemplateById(templateId, userId);

    if (!template) {
        throw new NotFoundError("Template not found");
    }

    const key = getKeyForS3Url(template.s3_url)
    const presignedUrl = await generatePresignedUrl(key);

    res.status(200).json({
        templateId: template.id,
        userId: template.user_id,
        presignedUrl: presignedUrl,
        name: template.name,
        width: template.width,
        height: template.height,
        createdAt: template.created_at
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
    const { templateId } = templateIdParamSchema.parse(req.params)
    const userId = req.user!.id

    await deleteTemplateById(templateId, userId);

    res.status(204).end();
}

export async function updateTemplateName(req: Request<IdParam>, res: Response, next: NextFunction) {
    const { templateId } = templateIdParamSchema.parse(req.params)
    const { name } = updateTemplateSchema.parse(req.body)
    const userId = req.user!.id

    const template = await updateTemplateNameService(templateId, userId, name)

    return res.status(200).json({
        templateId: template.id,
        userId: template.user_id,
        s3Url: template.s3_url,
        name: template.name,
        width: template.width,
        height: template.height,
        createdAt: template.created_at
    })
}

export async function deactivateTemplate(req: Request<IdParam>, res: Response, next: NextFunction) {
    const { templateId } = templateIdParamSchema.parse(req.params)
    const userId = req.user!.id

    const template = await deactivateTemplateService(templateId, userId)

    return res.status(200).json({
        templateId: template.id,
        userId: template.user_id,
        s3Url: template.s3_url,
        name: template.name,
        width: template.width,
        height: template.height,
        createdAt: template.created_at
    })
}