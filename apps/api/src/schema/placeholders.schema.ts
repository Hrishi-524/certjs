import { z } from "zod";

export const IdParamSchema = z.object({
    id: z.uuid()
});

export const PlaceholderIdParamSchema = z.object({
    id: z.uuid(),
    placeholderId: z.uuid()
});

export const PlaceholderSchema = z.object({
    name: z.string().trim().min(1),
    x: z.coerce.number().nonnegative(),
    y: z.coerce.number().nonnegative(),
    key: z.string().trim().min(1),
    width: z.coerce.number().nonnegative(),
    font_size: z.number().int().positive(),
    font_color: z.string().trim().min(1),
    font_family: z.string().trim().min(1),
    height: z.number().int().positive(),
    strategy: z.enum(["shrink", "ellipsis", "wrap"]).optional(),
    min_font_size: z.number().int().positive().optional(),
    align: z.enum(["left", "center", "right"]).optional()
});

export const CreatePlaceholdersSchema =
    z.array(PlaceholderSchema);

export const UpdatePlaceholderSchema =
    PlaceholderSchema.partial();

export type IdParam = z.infer<typeof IdParamSchema>;

export type PlaceholderIdParam = z.infer<typeof PlaceholderIdParamSchema>;

export type CreatePlaceholdersInput = z.infer<typeof CreatePlaceholdersSchema>;
export type UpdatePlaceholderInput = z.infer<typeof UpdatePlaceholderSchema>;