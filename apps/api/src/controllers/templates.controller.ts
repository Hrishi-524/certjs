import type { Request, Response, NextFunction } from "express";
import type { IdParam } from "#app/controllers/types";
import { getTemplateById, getAllTemplates, deleteTemplateById, createTemplate, updateTemplateNameService, deactivateTemplateService, activateTemplateService } from "#app/services/templates/templates.service";
import { uploadTemplateImage } from "#app/services/templates/storage.service";
import crypto from "crypto";
import { BadRequestError, NotFoundError } from "#app/middleware/express-errors";
import { createTemplateSchema, templateIdParamSchema, updateTemplateSchema } from "#app/schema/templates.schema";
import { storage } from "@certjs/storage";

export const uploadTemplate = async (req: Request, res: Response) => {
    if (!req.file) {
        throw new BadRequestError("Template file is required")
    }

    const userId = req.user!.id;
    const templateId = crypto.randomUUID()
   
    const { name, width, height } = createTemplateSchema.parse(req.body);

    const { key } = await uploadTemplateImage(
        req.file.buffer,
        req.file.mimetype,
        userId,
        templateId
    );
    
    const template = await createTemplate(templateId, key, userId, name, width, height);

    res.status(201).json({
        templateId: template.id,
        ...template
    });
};

export async function getTemplate(req: Request<IdParam>, res: Response, next: NextFunction) {
    const { templateId } = templateIdParamSchema.parse(req.params);
    const userId = req.user!.id;

    const template = await getTemplateById(templateId, userId);

    if (!template) {
        throw new NotFoundError("Template not found");
    }

    const presignedUrl = await storage.getSignedUrl(template.storageKey);

    res.status(200).json({
        templateId: template.id,
        ...template,
        presignedUrl
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
        userId: template.userId,
        name: template.name,
        createdAt: template.createdAt,
        updatedAt: template.updatedAt
    })
}

export async function deactivateTemplate(req: Request<IdParam>, res: Response, next: NextFunction) {
    const { templateId } = templateIdParamSchema.parse(req.params)
    const userId = req.user!.id

    await deactivateTemplateService(templateId, userId)

    return res.status(200).json({
        message: "Template deactivated successfully",
    })
}

export async function activateTemplate(req: Request<IdParam>, res: Response, next: NextFunction) {
    const { templateId } = templateIdParamSchema.parse(req.params)
    const userId = req.user!.id
    
    await activateTemplateService(templateId, userId)

    return res.status(200).json({
        message: "Template activated successfully",
    })
}
