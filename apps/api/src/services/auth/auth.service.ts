import bcrypt from "bcrypt";
import type { RegisterInput, LoginInput } from "@/types/auth-types";
import { db } from "@certjs/db";
import { users } from "@certjs/db/schema";
import { ConflictError, UnauthorizedError } from "@/middleware/express-errors";
import { authConfig } from "@/config/auth-config";
import { generateAccessToken, generateRefreshToken, hashRefreshToken }from "./token.service";
import { createSession, findValidSessionByRefreshToken, revokeAllSessionsForUser, revokeSession, rotateRefreshToken } from "./sessions.service";

export async function registerWithPassword(input: RegisterInput) {
   const existingUser = await db.query.users.findFirst({
        where: (users, { eq, or }) =>
            or(
                eq(users.email, input.email),
                eq(users.username, input.username)
            )
    });

    if (existingUser) {
        throw new ConflictError(
            "Email or Username already exists"
        );
    }

    const passwordHash = await bcrypt.hash(input.password, authConfig.bcryptSaltRounds);

    const [user] = await db.insert(users).values({
        name: input.name,
        username: input.username,
        email: input.email,
        password_hash: passwordHash
    }).returning({
        id: users.id,
        email: users.email,
        username: users.username
    });

    return {
        id: user.id,
        email: user.email,
        username: user.username 
    };
}

export async function loginWithPassword(input: LoginInput) {
    const user = await db.query.users.findFirst({
        where: (users, {eq}) => eq(users.email, input.email)
    });

    if (!user) {
        throw new UnauthorizedError("Invalid email or password");
    }

    if(user.password_hash === null) {
        throw new UnauthorizedError("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(input.password, user.password_hash);

    if (!isMatch) {
        throw new UnauthorizedError("Invalid email or password");
    }
    
    const { session, refreshToken } = await createSession(user.id);

    const accessToken = generateAccessToken(user.id);

    return {
        accessToken,
        refreshToken,
        session: {
            id: session.id,
            expires_at: session.expires_at
        },
        user: {
            id: user.id,
            email: user.email,
            username: user.username
        }
    };
}

export async function refreshSession( refreshToken: string ) {
    const session = await findValidSessionByRefreshToken(refreshToken);

    const rotatedRefreshToken = await rotateRefreshToken(session.id);

    const accessToken = generateAccessToken(session.user_id);

    return {
        accessToken,
        refreshToken: rotatedRefreshToken
    };
}

export async function logout( refreshToken: string ) {
    const session = await findValidSessionByRefreshToken(refreshToken);

    await revokeSession(session.id);

    return { success: true };
}

export async function logoutAllSessionsForUser( refreshToken: string ) {
    const session = await findValidSessionByRefreshToken(refreshToken);

    await revokeAllSessionsForUser(session.user_id);

    return { success: true };
}

export async function getCurrentUserService(userId: string) {
    const user = await db.query.users.findFirst({
        where: (users, { eq }) =>
            eq(users.id, userId)
    });

    if (!user) {
        throw new UnauthorizedError("User not found");
    }

    return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar_url: user.avatar_url,
        email_verified: user.email_verified
    };
}