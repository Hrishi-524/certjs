import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "./express-errors.js";
import { findApiKeyByHash } from "#app/services/keys/find-api-key-by-hash";

export async function requireApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.header("X-Api-Key");

    if(!apiKey) {
        throw new UnauthorizedError("Api key is not provided in request");
    }

    try {
        const userId = await findApiKeyByHash(apiKey);
    
        req.user = {
            id: userId,
            authType: "api-key"
        }

        next()
    } catch (error) {
        next(new UnauthorizedError("Api key is Invalid or disabled"));
    }
}