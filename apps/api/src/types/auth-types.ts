import { z } from "zod";
import { loginSchema, signUpSchema } from "@/schema/auth.schema";

export type RegisterInput = z.infer<typeof signUpSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

