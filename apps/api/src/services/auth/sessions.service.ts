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
        user_id: userId,
        token_hash: refreshTokenHash,
        expires_at: new Date(
            Date.now() + ms(authConfig.refreshTokenExpiresIn)
        )
    }).returning({
        id: sessions.id,
        expires_at: sessions.expires_at
    });

    return { session, refreshToken };
}

export async function revokeSession(sessionId: string) {
    await db.update(sessions).set({
        revoked_at: new Date()
    }).where(
        eq(sessions.id, sessionId)
    );
}

export async function revokeAllSessionsForUser(userId: string) {
    await db.update(sessions).set({
        revoked_at: new Date()
    }).where(
        eq(sessions.user_id, userId)
    );
}

export async function findValidSessionByRefreshToken( refreshToken: string) {
    const refreshTokenHash = hashRefreshToken(refreshToken);
    
    const session = await db.query.sessions.findFirst({
        where: (sessions, { eq }) =>
            eq(
                sessions.token_hash,
                refreshTokenHash
            )
    });

    // Ideally want to compare by timezones 
    if (!session || session.revoked_at || session.expires_at < new Date()) {
        throw new UnauthorizedError("Invalid refresh token");
    }

    return session;
}

export async function rotateRefreshToken( sessionId: string ) {
    const { refreshToken: newRefreshToken, refreshTokenHash: newRefreshTokenHash } = generateRefreshToken();
    await db.update(sessions).set({
        token_hash: newRefreshTokenHash,
        last_used_at: new Date()
    }).where(
        eq(
            sessions.id,
            sessionId
        )
    );

    return newRefreshToken;
}