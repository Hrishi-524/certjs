import { z } from "zod"

export const JobIdParamSchema = z.object({
    jobId: z.uuid()
});

const DeliveryContentSchema = z.object({
    sender: z.string().nullable(),
    subject: z.string(),
    body: z.string(),
    data: z
        .array(z.record(z.string(), z.union([z.string(), z.number()])))
        .optional(),
});

const DeliverySchema = z.object({
    channel: z.enum(["email", "webhook"]),
    scope: z.enum(["recipient", "batch"]),
    destination: z.array(z.string()).min(1),
    content: DeliveryContentSchema.nullable(),
});

export const JobSemanticsSchema = z.object({
    deliveries: z.array(DeliverySchema),
    identification: z.object({
        fields: z.array(z.string()),
        separator: z.string(),
        case: z.enum(["lower", "upper", "preserve"]),
        collision: z.enum(["prefix", "suffix"]),
        docId: z.boolean(),
    }),
    dashboardPersistence: z.boolean(),
});

export const CreateJobSchema = z.object({
    templateId: z.uuid(),
    idempotencyKey: z.string(),
    recipients: z.array(z.record(z.string(),z.union([z.string(), z.number()]))).min(1),
    semantics: JobSemanticsSchema,
});


export const playgroundPreviewSchema = z.object({
    templateId: z.uuid(),
    recipient: z.record(z.string(),z.union([z.string(),z.number()]))
});