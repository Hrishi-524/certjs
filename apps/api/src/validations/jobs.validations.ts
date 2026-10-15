import { z } from "zod";

export const createJobSchema = z.object({
    templateId: z.uuid(),
    recipients: z
        .array(z.record(z.string(), z.any()))
        .min(1, "At least one recipient required"),
    idempotencyKey: z.string(),
});
