import type {
    Request,
    Response,
    NextFunction
} from "express";

import { UnauthorizedError } from "./express-errors";
import { verifyAccessToken } from "@/services/auth/token.service";

export async function requireAuth( req: Request, res: Response, next: NextFunction ) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(new UnauthorizedError( "Missing authorization header" ));
    }

    const [scheme, token] = authHeader.split(" ");

    if ( scheme !== "Bearer" || !token ) {
        return next(new UnauthorizedError("Invalid authorization header"));
    }

    try {
        const payload = verifyAccessToken(token);

        req.user = { 
            id: payload.sub,
            authType: "jwt"
        };

        next();
    } catch {
        next(new UnauthorizedError("Invalid access token"));
    }
}