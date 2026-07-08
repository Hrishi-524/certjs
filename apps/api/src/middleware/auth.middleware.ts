import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "./express-errors";
import { verifyAccessToken } from "@/services/auth/token.service";
import { ErrorCode } from "@/types/auth-types";
import * as jwt from "jsonwebtoken";

export async function requireAuth( req: Request, res: Response, next: NextFunction ) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(new UnauthorizedError( "Missing authorization header", ErrorCode.ACCESS_TOKEN_MISSING));
    }

    const [scheme, token] = authHeader.split(" ");

    if ( scheme !== "Bearer" || !token ) {
        return next(new UnauthorizedError("Invalid authorization header", ErrorCode.INVALID_AUTH_HEADER));
    }
    
    try {
        const payload = verifyAccessToken(token);

        req.user = { 
            id: payload.sub,
            authType: "jwt"
        };

        next();
    } catch(error) {
        return next(error);
    }
}