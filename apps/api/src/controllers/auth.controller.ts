import type { Request, Response } from "express";
import { registerWithPassword, loginWithPassword, logout, getCurrentUserService, refreshSession, logoutAllSessionsForUser } from "@/services/auth/auth.service";
import { UnauthorizedError } from "@/middleware/express-errors";
import { getGoogleAuthUrl, loginWithGoogle } from "@/services/auth/oauth.servcie";
import { googleOAuthClient } from "@/config/google-oauth";
import { ErrorCode } from "@/types/auth-types";
import { authConfig } from "@/config/auth-config";

// helpers
const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 30 * 24 * 60 * 60 * 1000
};

export async function signUpUser(req: Request, res: Response) {
    const data = await registerWithPassword(req.body)
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
        "refreshToken",
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
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        throw new UnauthorizedError(
            "Refresh token missing"
        );
    }

    await logout(refreshToken);

    res.clearCookie("refreshToken", refreshCookieOptions);

    res.status(204).send();
};

export const getCurrentUser = async (req: Request, res: Response) => {
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
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new UnauthorizedError(
            "Refresh token missing",
            ErrorCode.REFRESH_TOKEN_MISSING
        );
    }
    
    const tokens = await refreshSession(refreshToken);

    res.cookie(
        "refreshToken",
        tokens.refreshToken,
        refreshCookieOptions
    );

    res.status(200).json({
        accessToken: tokens.accessToken
    });
}

export const logoutAllUserSessions = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    await logoutAllSessionsForUser(refreshToken);

    res.clearCookie("refreshToken", refreshCookieOptions);

    res.status(204).send();
}

export async function redirectToGoogleAuth(req: Request, res: Response) {
    const url = getGoogleAuthUrl();
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
    const redirectUrl = new URL("/auth/callback", process.env.FRONTEND_URL);

    redirectUrl.searchParams.set(
        "accessToken",
        credentials.accessToken
    );

    res.redirect(redirectUrl.toString());
/*
    const credentials: {
        accessToken: string;
        refreshToken: `${string}-${string}-${string}-${string}-${string}`;
        session: {
            id: string;
            expires_at: Date;
        };
        user: {
            id: string;
            email: string;
        };
    }
*/
}

