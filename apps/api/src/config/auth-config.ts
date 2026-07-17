import type { StringValue } from "ms";

export const authConfig = {
    accessTokenExpiresIn:
        (process.env.ACCESS_TOKEN_EXPIRES_IN ??
            "30s") as StringValue,

    refreshTokenExpiresIn:
        (process.env.REFRESH_TOKEN_EXPIRES_IN ??
            "1d") as StringValue,

    jwtSecret: process.env.JWT_SECRET!,

    bcryptSaltRounds:
        parseInt(
            process.env.BCRYPT_SALT_ROUNDS!,
            10
        )
};