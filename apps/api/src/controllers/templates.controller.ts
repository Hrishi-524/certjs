import type { Request, Response, NextFunction } from "express";
import type { IdParam } from "@/controllers/types";
import { getTemplateById, getAllTemplates, deleteTemplateById, createTemplate } from "@/services/templates.service";
import { uploadTemplateImage } from "@/services/storage.service";
import crypto from "crypto";

export const uploadTemplate = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ message: "Template file is required" });
    }

    // const userId = req.user.id;
    const template_id = crypto.randomUUID();
    // NOTE: this is temporary that user_id is passed in the body, we will replace this with the user id from the auth middleware once we have that set up
    const { name, width, height, user_id } = req.body;

    const result = await uploadTemplateImage(
        req.file.buffer,
        req.file.mimetype,
        user_id,
        template_id
    );
    
    const template = await createTemplate(template_id, result.url, user_id, name, parseInt(width), parseInt(height));

    res.status(201).json({
        message: "Template uploaded",
        key: result.key,
        url: result.url,
        template
    });
};

export const getTemplate = async (req: Request<IdParam>, res: Response, next: NextFunction) => {
    const { id: templateId } = req.params;
    const template = await getTemplateById(templateId);
    if (!template) {
        return res.status(404).json({ message: "Template not found" });
    }
    res.status(200).json(template);
}

export const getTemplates = async (req: Request, res: Response, next: NextFunction) => {
    const templates = await getAllTemplates();
    res.status(200).json(templates);

}

export const deleteTemplate = async (req: Request<IdParam>, res: Response, next: NextFunction) => {
    const { id: templateId } = req.params;
    await deleteTemplateById(templateId);
    res.status(204).json({ message: "Template deleted" });
}