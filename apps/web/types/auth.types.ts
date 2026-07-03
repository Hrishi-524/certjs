export type SignUpInput = {
    name: string;
    username: string;
    email: string;
    password: string;
}

export type SignUpResponse = {
    user: {
        id: string;
        email: string;
        username: string;
    }
}

export type LoginInput = {
    email: string;
    password: string;
}

export type LoginResponse = {
    accessToken: string;
    user: {
        id: string;
        email: string;
        username: string;
    };
    session: {
        id: string;
        expiresAt: string;
    }
}

export type RefreshResponse = {
    accessToken: string;
}

export type MeResponse = {
    user: {
        id: string;
        name: string;
        username: string;
        email: string;
        avatarUrl: string | null;
        emailVerified: boolean;
    }
}