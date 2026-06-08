import { z } from "zod";
import type { Request, Response, NextFunction} from "express";
import { BadRequestError } from "./express-errors";

export function validateRequest( schema: z.ZodType ) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            console.error("Validation error:", result.error.issues);
            throw new BadRequestError("Invalid request data");
        }

        req.body = result.data;

        next();
    };
}