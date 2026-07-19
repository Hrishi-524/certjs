import { z } from "zod";

export const TemplateIdParamSchema = z.object({
    templateId: z.uuid()
});

export const PlaceholderIdParamSchema = z.object({
    templateId: z.uuid(),
    placeholderId: z.uuid()
});

export const PlaceholderSchema = z.object({
    name: z.string().trim().min(1),
    x: z.coerce.number().nonnegative(),
    y: z.coerce.number().nonnegative(),
    key: z.string().trim().min(1),
    width: z.coerce.number().nonnegative(),
    height: z.number().positive(),
    strategy: z.enum(["shrink", "ellipsis", "wrap"]).optional(),
    align: z.enum(["left", "center", "right"]).optional(),
    fontSize: z.number().int().positive(),
    fontColor: z.string().trim().min(1),
    fontFamily: z.string().trim().min(1),
    minFontSize: z.number().int().positive().optional(),
});

export const SyncPlaceholdersSchema = z.array(PlaceholderSchema);

export const CreatePlaceholdersSchema = z.array(PlaceholderSchema);

export const SingleUpdatePlaceholderSchema = PlaceholderSchema.partial().extend({
    placeholderId: z.uuid(), 
    templateId: z.uuid(),
});

export const UpdatePlaceholderSchema = z.array(SingleUpdatePlaceholderSchema);

export const DeletePlaceholderSchema = z.array(PlaceholderIdParamSchema);

export type TemplateIdParam = z.infer<typeof TemplateIdParamSchema>;

export type PlaceholderIdParam = z.infer<typeof PlaceholderIdParamSchema>;

export type CreatePlaceholdersInput = z.infer<typeof CreatePlaceholdersSchema>;

export type UpdatePlaceholderInput = z.infer<typeof UpdatePlaceholderSchema>;

export type DeletePlaceholderInput = z.infer<typeof DeletePlaceholderSchema>;