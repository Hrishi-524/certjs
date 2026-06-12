import type { Request, Response, NextFunction } from "express";
import { IdParam } from "./types";
import { createPlaceholders, getPlaceholdersByTemplateId, updatePlaceholder, deletePlaceholder } from "@/services/placeholders/placeholders.service";
import { CreatePlaceholdersSchema, IdParamSchema, PlaceholderIdParamSchema, UpdatePlaceholderSchema} from "@/schema/placeholders.schema";

export async function addPlaceholdersToTemplate(req: Request<IdParam>, res: Response) {
    const { id : template_id } = IdParamSchema.parse(req.params);

    const items = CreatePlaceholdersSchema.parse(req.body);

    const listOfPlaceholders = await createPlaceholders(template_id, items);

    res.status(201).json(listOfPlaceholders);
}

export async function getPlaceholdersForTemplate(req: Request<IdParam>, res: Response) {
    const { id : template_id } = req.params;

    const placeholders = await getPlaceholdersByTemplateId(template_id);

    res.status(200).json(placeholders);
}

export async function updatePlaceholderForTemplate(req: Request, res: Response) {
    const { id: templateId, placeholderId } =  PlaceholderIdParamSchema.parse(req.params);
    const data = UpdatePlaceholderSchema.parse(req.body);

    const updatedPlaceholder = await updatePlaceholder(templateId, placeholderId, data);

    res.status(200).json(updatedPlaceholder);
}

export async function deletePlaceholderForTemplate(req: Request, res: Response) {
    const { id: templateId, placeholderId } =  PlaceholderIdParamSchema.parse(req.params);

    await deletePlaceholder(placeholderId);

    res.status(204).send();
}