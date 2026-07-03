import type { Request, Response } from "express";
import { registerWithPassword, loginWithPassword, logout, getCurrentUserService, refreshSession, logoutAllSessionsForUser } from "@/services/auth/auth.service";
import { UnauthorizedError } from "@/middleware/express-errors";
import { getGoogleAuthUrl, loginWithGoogle } from "@/services/auth/oauth.servcie";
import { googleOAuthClient } from "@/config/google-oauth";

// helpers
const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 30 * 24 * 60 * 60 * 1000
};

export async function signUpUser(req: Request, res: Response) {
    console.log("controllers/auth.controller.ts: signUpUser called with body:", req.body);
    const data = await registerWithPassword(req.body)

    console.log("controllers/auth.controller.ts: signUpUser response data:", data);
    res.status(201).json({
        accessToken: data.accessToken,
        user: {
            id: data.user.id,
            email: data.user.email
        },
        session: {
            id: data.session.id,
            expiresAt: data.session.expires_at
        }
    });
}

export async function loginUser(req: Request, res: Response) {
    const data = await loginWithPassword(req.body);

    res.cookie(
        "refresh_token",
        data.refreshToken,
        refreshCookieOptions
    );
    
    res.status(200).json({
        accessToken: data.accessToken,
        user: {
            id: data.user.id,
            email: data.user.email
        },
        session: {
            id: data.session.id,
            expiresAt: data.session.expires_at
        }
    });
}

export const logoutUser = async ( req: Request, res: Response ) => {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
        throw new UnauthorizedError(
            "Refresh token missing"
        );
    }

    await logout(refreshToken);

    res.clearCookie("refresh_token", refreshCookieOptions);

    res.status(204).send();
};

export const getCurrentUser = async (req: Request, res: Response) => {
    if(!req.user) {
        throw new UnauthorizedError("User not authenticated");
    }
    const user = await getCurrentUserService(req.user.id);
    res.status(200).json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatarUrl: user.avatar_url,
            emailVerified: user.email_verified
        }
    });
};

export const refreshAccessToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
        throw new UnauthorizedError(
            "Refresh token missing"
        );
    }
    
    const tokens = await refreshSession(refreshToken);

    res.cookie(
        "refresh_token",
        tokens.refreshToken,
        refreshCookieOptions
    );

    res.status(200).json({
        accessToken: tokens.accessToken
    });
}

export const logoutAllUserSessions = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refresh_token;

    await logoutAllSessionsForUser(refreshToken);

    res.clearCookie("refresh_token", refreshCookieOptions);

    res.status(204).send();
}

export async function redirectToGoogleAuth(req: Request, res: Response) {
    const url = getGoogleAuthUrl();
    console.log("Redirecting to Google OAuth URL:", url);
    res.redirect(url);
}

export async function handleGoogleAuthCallback(req: Request, res: Response) {
    const code = req.query.code as string;
    const credentials = await loginWithGoogle(code)
    res.cookie(
        "refreshToken",
        credentials.refreshToken,
        refreshCookieOptions
    );
    res.json(credentials);
}

