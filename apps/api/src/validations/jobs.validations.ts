import { z } from "zod";

export const createJobSchema = z.object({
    template_id: z.string().min(1),
    recipients: z
        .array(z.record(z.string(), z.any()))
        .min(1, "At least one recipient required"),
    idempotency_key: z.string(),
});