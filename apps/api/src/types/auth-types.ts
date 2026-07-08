import { z } from "zod";
import { loginSchema, signUpSchema } from "@/schema/auth.schema";

export type RegisterInput = z.infer<typeof signUpSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export enum ErrorCode {
    ACCESS_TOKEN_EXPIRED = "ACCESS_TOKEN_EXPIRED",
    ACCESS_TOKEN_MISSING = "ACCESS_TOKEN_MISSING",
    INVALID_ACCESS_TOKEN = "INVALID_ACCESS_TOKEN",
    REFRESH_TOKEN_EXPIRED = "REFRESH_TOKEN_EXPIRED",
    REFRESH_TOKEN_MISSING = "REFRESH_TOKEN_MISSING",
    INVALID_AUTH_HEADER = "INVALID_AUTH_HEADER",
}