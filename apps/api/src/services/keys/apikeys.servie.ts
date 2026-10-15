import { apiKeys, db } from "@certjs/db";
import { generateApiKey } from "./generate-api-key.js";
import { BadRequestError, NotFoundError } from "#app/middleware/express-errors";
import { and, eq, desc } from "drizzle-orm";

export async function createApiKeyService(userId: string, name: string, expiry: Date | null | undefined) {
    if(expiry && expiry < new Date()) {
        throw new BadRequestError("Expiry must be in future");
    }

    const { apikey, hash, prefix } = generateApiKey();

    const [row] = await db.insert(apiKeys).values({
        userId: userId,
        keyHash: hash,
        keyPrefix: prefix,
        name: name,
        expiresAt: expiry ?? null
    }).returning();

    return {
        apikey,
        prefix,
        apiKeyId : row.id
    }
}

export async function getPrefix(apiKeyId: string, userId: string) {
    const [row] = await db.select().from(apiKeys).where(
        and(
            eq(apiKeys.id, apiKeyId),
            eq(apiKeys.userId, userId)
        )
    );

    if(!row) {
        throw new NotFoundError("Api key not found");
    }

    return row.keyPrefix;
}

export async function deleteApiKeyService(apiKeyId: string, userId: string) {
    const [row] = await db.delete(apiKeys).where(
        and(
            eq(apiKeys.id, apiKeyId),
            eq(apiKeys.userId, userId)
        )
    ).returning();

    if(!row) {
        throw new NotFoundError("Api key not found");
    }

    return
}

export async function deActivateApiKeyService(apiKeyId: string, userId: string) {
    const [row] = await db.update(apiKeys).set({
        isActive: false
    }).where(
        and(
            eq(apiKeys.id, apiKeyId),
            eq(apiKeys.userId, userId)
        )
    ).returning()

    if(!row) {
        throw new NotFoundError("Api key not found");
    }

    return { name : row.name, prefix: row.keyPrefix }
}

export async function getAllApiKeysService(userId: string) {
    const allApiKeys = await db.select().from(apiKeys).where( 
        eq(apiKeys.userId, userId)
    ).orderBy(desc(apiKeys.createdAt));

    return allApiKeys;
}
