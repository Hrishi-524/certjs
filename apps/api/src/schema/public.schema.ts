import { z } from "zod";

export const verifyTokenParamSchema = z.object({
    verifyToken: z.string().regex(/^[a-f0-9]+$/i)
});