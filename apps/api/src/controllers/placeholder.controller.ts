import type { Request, Response, NextFunction } from "express";
import { IdParam } from "./types";
import { createPlaceholders, getPlaceholdersByTemplateId } from "@/services/placeholders/placeholders.service";

export const addPlaceholdersToTemplate = async (req: Request<IdParam>, res: Response) => {
    const { id: template_id } = req.params;
    const items = req.body; 

    const result = await createPlaceholders(template_id, items);

    res.status(201).json({
        message: "Placeholders added to template",
        placeholders: result
    });
}

export const getPlaceholdersForTemplate = async (req: Request<IdParam>, res: Response) => {
    const { id : template_id } = req.params;

    const placeholders = await getPlaceholdersByTemplateId(template_id);

    res.status(200).json({
        message: "Placeholders retrieved for template",
        placeholders
    });
}

export const updatePlaceholderForTemplate = async (req: Request, res: Response, next: NextFunction) => {
}

export const deletePlaceholderForTemplate = async (req: Request, res: Response, next: NextFunction) => {
}