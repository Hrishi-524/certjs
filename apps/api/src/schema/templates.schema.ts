import { z } from "zod";

export const templateIdParamSchema = z.object({
    id: z.uuid()
});

export const createTemplateSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Template name is required")
        .max(100, "Template name must be at most 100 characters"),

    width: z.coerce
        .number()
        .int("Width must be an integer")
        .positive("Width must be positive")
        .max(10000, "Width is too large"),

    height: z.coerce
        .number()
        .int("Height must be an integer")
        .positive("Height must be positive")
        .max(10000, "Height is too large")
});

export const updateTemplateSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1)
        .max(100)
        .optional(),

    is_active: z
        .boolean()
        .optional()
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "At least one field must be provided"
    }
);

export type CreateTemplateInput =
    z.infer<typeof createTemplateSchema>;

export type UpdateTemplateInput =
    z.infer<typeof updateTemplateSchema>;

export type TemplateIdParams =
    z.infer<typeof templateIdParamSchema>;