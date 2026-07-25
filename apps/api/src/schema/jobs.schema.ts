import { z } from "zod"

export const JobIdParamSchema = z.object({
    jobId: z.uuid()
});


export const CreateJobSchema = z.object({
    templateId: z.uuid(),
    recipients: z.array(z.record(z.string(),z.union([z.string(),z.number()]))).min(1),
    idempotencyKey: z.string(),
    webhookUrl: z.url().optional()
});

export const playgroundPreviewSchema = z.object({
    templateId: z.uuid(),
    recipient: z.record(z.string(),z.union([z.string(),z.number()]))
});