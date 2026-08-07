import { googleOAuthClient } from "#app/config/google-oauth";
import { oauth_accounts, users } from "@certjs/db/schema";
import { db } from "@certjs/db";
import { InternalServerError, NotFoundError } from "#app/middleware/express-errors";
import { createSession } from "./sessions.service.js";
import { generateAccessToken }from "./token.service.js";
import { TokenPayload } from "google-auth-library";

export function getGoogleAuthUrl() {
    return googleOAuthClient.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: [
            "openid",
            "email",
            "profile"
        ]
    });
}

export async function loginWithGoogle(code: string) {
    // get tokens for recived code
    const { tokens } = await googleOAuthClient.getToken(code)

    // verify and generate ticket after verification
    const ticket = await googleOAuthClient.verifyIdToken({
        idToken: tokens.id_token!,
        audience: process.env.GOOGLE_CLIENT_ID
    })

    // get user payload (data)
    const payload = ticket.getPayload()

    if(!payload) {
        throw new InternalServerError("Google account data cannot be fetched")
    }

    if (!payload.email_verified) {
        throw new InternalServerError( "Google email is not verified" );
    }

    if (!payload.email) {
        throw new InternalServerError( "Google account email missing");
    }

    if(!payload.name) {
        throw new InternalServerError( "Google account name missing");
    }
    
    // find oauth account
    const oauthAccount = await db.query.oauth_accounts.findFirst({
        where: (oauth_accounts, {eq, and}) => 
            and(
                eq(oauth_accounts.provider, "google"),
                eq(oauth_accounts.provider_account_id, payload.sub)
            )
    })
    
    // Find or Create user, ensure linking of oauth to users
    let userId: string

    if(oauthAccount) {
        userId = oauthAccount.user_id
    } else {
        userId = await findOrCreateUser(payload)
    }

    // find user
    const user = await db.query.users.findFirst({
        where: (users, { eq }) =>
            eq(users.id, userId)
    });

    if (!user) {
        throw new InternalServerError(
            "User record not found"
        );
    }

    // create session
    const { session, refreshToken } = await createSession(userId);

    // generate access token
    const accessToken = generateAccessToken(userId);

    // return session credentials and token
    return {
        accessToken,
        refreshToken,
        session: {
            id: session.id,
            expires_at: session.expires_at
        },
        user: {
            id: user.id,
            email: user.email
        }
    };
}

async function findOrCreateUser( payload: TokenPayload ) {
    let userId: string
    // find user by email
    const user = await db.query.users.findFirst({
        where: (users, {eq}) => eq(users.email, payload.email!)
    })

    if(user) {
        await db.insert(oauth_accounts).values({ 
            user_id: user.id, 
            provider: "google", 
            provider_account_id: payload.sub, 
            email: payload.email!
        })

        userId = user.id
    } else  {
        const user = await db.transaction(async (tx) => {
            const [user] = await tx.insert(users).values({ 
                name: payload.name!, 
                email: payload.email!, 
                avatar_url: payload.picture 
            }).returning()

            await tx.insert(oauth_accounts).values({ 
                user_id: user.id, 
                provider: "google", 
                provider_account_id: payload.sub, 
                email: payload.email! 
            })

            return user
        })

        userId = user.id
    }

    return userId;
}

function generateUsername(payload: TokenPayload) {
    return `${payload.email!.split("@")[0]}_${crypto.randomUUID().slice(0, 8)}`
}