import { AppError } from "./express-errors.js";
import type {Request, Response, NextFunction } from "express";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            code: err.code,
            message: err.message
        });
    }

    console.error(err);

    return res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error"
    });
}