import jwt from "jsonwebtoken";
import { authConfig } from "@/config/auth-config";
import crypto from "crypto";

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
    return jwt.verify(token, authConfig.jwtSecret) as AccessTokenPayload;
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

