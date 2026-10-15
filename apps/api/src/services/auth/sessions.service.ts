import { db } from "@certjs/db";
import { sessions } from "@certjs/db/schema";
import ms from "ms"
import { authConfig } from "#app/config/auth-config";
import { eq } from "drizzle-orm";
import { generateRefreshToken, hashRefreshToken } from "./token.service.js";
import { UnauthorizedError } from "#app/middleware/express-errors";

export async function createSession(userId: string) {
    const { refreshToken, refreshTokenHash } = generateRefreshToken();
    
    const [session] = await db.insert(sessions).values({
        userId: userId,
        tokenHash: refreshTokenHash,
        expiresAt: new Date(
            Date.now() + ms(authConfig.refreshTokenExpiresIn)
        )
    }).returning({
        id: sessions.id,
        expiresAt: sessions.expiresAt
    });

    return { session, refreshToken };
}

export async function revokeSession(sessionId: string) {
    await db.update(sessions).set({
        revokedAt: new Date()
    }).where(
        eq(sessions.id, sessionId)
    );
}

export async function revokeAllSessionsForUser(userId: string) {
    await db.update(sessions).set({
        revokedAt: new Date()
    }).where(
        eq(sessions.userId, userId)
    );
}

export async function findValidSessionByRefreshToken( refreshToken: string) {
    const refreshTokenHash = hashRefreshToken(refreshToken);
    
    const session = await db.query.sessions.findFirst({
        where: (sessions, { eq }) =>
            eq(
                sessions.tokenHash,
                refreshTokenHash
            )
    });

    // Ideally want to compare by timezones 
    if (!session || session.revokedAt || session.expiresAt < new Date()) {
        throw new UnauthorizedError("Invalid refresh token");
    }

    return session;
}

export async function rotateRefreshToken( sessionId: string ) {
    const { refreshToken: newRefreshToken, refreshTokenHash: newRefreshTokenHash } = generateRefreshToken();
    await db.update(sessions).set({
        tokenHash: newRefreshTokenHash,
        lastUsedAt: new Date()
    }).where(
        eq(
            sessions.id,
            sessionId
        )
    );

    return newRefreshToken;
}