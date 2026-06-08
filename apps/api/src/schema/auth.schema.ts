import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(2).max(100),

    username: z
        .string()
        .min(3)
        .max(30),

    email: z.email(),

    password: z
        .string()
        .min(8)
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1)
});