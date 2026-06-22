import { z } from "zod"

export const createApiKeySchema = z.object({
    name: z.string().min(3).max(60),
    expiry: z.coerce.date().nullable().optional()
})

export const apiKeyIdSchema = z.object({
    apiKeyId : z.uuid()
})