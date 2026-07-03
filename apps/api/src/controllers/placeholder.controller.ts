import type { Request, Response } from "express";
import { createPlaceholders, getPlaceholdersByTemplateId, updatePlaceholder, deletePlaceholder } from "@/services/placeholders/placeholders.service";
import { CreatePlaceholdersSchema, PlaceholderIdParamSchema, TemplateIdParam, TemplateIdParamSchema, UpdatePlaceholderSchema} from "@/schema/placeholders.schema";
import type { PlaceholderUpdateData } from "@/types/placeholder-types";

export async function addPlaceholdersToTemplate(req: Request<TemplateIdParam>, res: Response) {
    const { templateId } = TemplateIdParamSchema.parse(req.params);

    const items = CreatePlaceholdersSchema.parse(req.body);

    const listOfPlaceholders = await createPlaceholders(templateId, items);

    res.status(201).json(listOfPlaceholders);
}

export async function getPlaceholdersForTemplate(req: Request<TemplateIdParam>, res: Response) {
    const { templateId } = TemplateIdParamSchema.parse(req.params);

    const placeholders = await getPlaceholdersByTemplateId(templateId);

    res.status(200).json(placeholders);
}

export async function updatePlaceholderForTemplate(req: Request, res: Response) {
    const { templateId, placeholderId } =  PlaceholderIdParamSchema.parse(req.params);
    const data = UpdatePlaceholderSchema.parse(req.body);

    const dataToUpdate: PlaceholderUpdateData = {};

    if (data.name !== undefined) dataToUpdate.name = data.name;
    if (data.x !== undefined) dataToUpdate.x = data.x;
    if (data.y !== undefined) dataToUpdate.y = data.y;
    if (data.key !== undefined) dataToUpdate.key = data.key;
    if (data.width !== undefined) dataToUpdate.width = data.width;
    if (data.fontSize !== undefined) dataToUpdate.font_size = data.fontSize;
    if (data.fontColor !== undefined) dataToUpdate.font_color = data.fontColor;
    if (data.fontFamily !== undefined) dataToUpdate.font_family = data.fontFamily;
    if (data.height !== undefined) dataToUpdate.height = data.height;
    if (data.strategy !== undefined) dataToUpdate.strategy = data.strategy;
    if (data.minFontSize !== undefined) dataToUpdate.min_font_size = data.minFontSize;
    if (data.align !== undefined) dataToUpdate.align = data.align;

    if (Object.keys(dataToUpdate).length === 0) {
        return res.status(400).json({ 
            success: false, 
            error: "No valid fields provided for update." 
        });
    }

    const updatedPlaceholder = await updatePlaceholder(templateId, placeholderId, dataToUpdate);

    res.status(200).json(updatedPlaceholder);
}

export async function deletePlaceholderForTemplate(req: Request, res: Response) {
    const { templateId, placeholderId } =  PlaceholderIdParamSchema.parse(req.params);

    await deletePlaceholder(placeholderId);

    res.status(204).send();
}