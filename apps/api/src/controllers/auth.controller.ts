import type { Request, Response } from "express";
import { registerWithPassword, loginWithPassword, logout, getCurrentUserService, refreshSession, logoutAllSessionsForUser } from "@/services/auth/auth.service";
import { UnauthorizedError } from "@/middleware/express-errors";

// helpers
const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 30 * 24 * 60 * 60 * 1000
};

export async function signUpUser(req: Request, res: Response) {
    const user = await registerWithPassword(req.body)

    res.status(201).json({
        user: {
            id: user.id,
            email: user.email,
            username: user.username
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
            email: data.user.email,
            username: data.user.username
        },
        session: {
            id: data.session.id,
            expires_at: data.session.expires_at
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

    res.status(200).json({ success: true });
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
            username: user.username,
            email: user.email,
            avatar_url: user.avatar_url,
            email_verified: user.email_verified
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
        access_token: tokens.accessToken
    });
}

export const logoutAllUserSessions = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refresh_token;

    await logoutAllSessionsForUser(refreshToken);

    res.clearCookie("refresh_token", refreshCookieOptions);

    res.status(200).json({ success: true });
}

