import jwt from "jsonwebtoken";
import { authConfig } from "#app/config/auth-config";
import crypto from "crypto";
import { ErrorCode } from "#app/types/auth-types";
import { UnauthorizedError } from "#app/middleware/express-errors";

export interface AccessTokenPayload {
    sub: string;
    iat: number;
    exp: number;
}

export function generateAccessToken( userId: string ) {
    return jwt.sign({
        sub: userId
    }, authConfig.jwtSecret, {
        expiresIn: authConfig.accessTokenExpiresIn
    });
}

export function verifyAccessToken( token: string ): AccessTokenPayload {
    try {
        return jwt.verify(token, authConfig.jwtSecret) as AccessTokenPayload;
    } catch (error) {
        if(error instanceof Error && error.name === "TokenExpiredError") {
            throw new UnauthorizedError("Access token expired", ErrorCode.ACCESS_TOKEN_EXPIRED);
        } 
        if (error instanceof Error && error.name === "JsonWebTokenError") {
            throw new UnauthorizedError("Invalid access token", ErrorCode.INVALID_ACCESS_TOKEN);
        }
        throw error;
    }    
}

export function generateRefreshToken() {
    const refreshToken = crypto.randomUUID(); 
    const refreshTokenHash = hashRefreshToken(refreshToken);
    return {
        refreshToken,
        refreshTokenHash
    };
}

export function hashRefreshToken( refreshToken: string ) {
    return crypto.createHash("sha256").update(refreshToken).digest("hex");
}

