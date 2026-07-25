import type { Request, Response } from "express";
import { createPlaceholders, getPlaceholdersByTemplateId, updatePlaceholder, deletePlaceholder, syncPlaceholdersService } from "@/services/placeholders/placeholders.service";
import { CreatePlaceholdersSchema, PlaceholderIdParamSchema, SyncPlaceholdersSchema, TemplateIdParam, TemplateIdParamSchema, UpdatePlaceholderSchema} from "@/schema/placeholders.schema";
import type { PlaceholderUpdateData } from "@/types/placeholder-types";

export async function syncPlaceholdersForTemplate(req: Request, res: Response) {
    const { templateId } = TemplateIdParamSchema.parse(req.params);

    const items = SyncPlaceholdersSchema.parse(req.body);

    const placeholders = await syncPlaceholdersService(templateId, items);

    res.status(200).json(placeholders);
}

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

export async function deletePlaceholderForTemplate(req: Request, res: Response) {
    const { templateId, placeholderId } =  PlaceholderIdParamSchema.parse(req.params);

    await deletePlaceholder(placeholderId);

    res.status(204).send();
}