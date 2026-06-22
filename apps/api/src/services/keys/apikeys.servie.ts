import { apikeys, db } from "@certjs/db";
import { generateApiKey } from "./generate-api-key";
import { BadRequestError, NotFoundError } from "@/middleware/express-errors";
import { and, eq, desc } from "drizzle-orm";

export async function createApiKeyService(userId: string, name: string, expiry: Date | null | undefined) {
    if(expiry && expiry < new Date()) {
        throw new BadRequestError("Expiry must be in future");
    }

    const { apikey, hash, prefix } = generateApiKey();

    const [row] = await db.insert(apikeys).values({
        user_id: userId,
        key_hash: hash,
        key_prefix: prefix,
        name: name,
        expires_at: expiry ?? null
    }).returning();

    return {
        apikey,
        prefix,
        apiKeyId : row.id
    }
}

export async function getPrefix(apiKeyId: string, userId: string) {
    const [row] = await db.select().from(apikeys).where(
        and(
            eq(apikeys.id, apiKeyId),
            eq(apikeys.user_id, userId)
        )
    );

    if(!row) {
        throw new NotFoundError("Api key not found");
    }

    return row.key_prefix;
}

export async function deleteApiKeyService(apiKeyId: string, userId: string) {
    const [row] = await db.delete(apikeys).where(
        and(
            eq(apikeys.id, apiKeyId),
            eq(apikeys.user_id, userId)
        )
    ).returning();

    if(!row) {
        throw new NotFoundError("Api key not found");
    }

    return
}

export async function deActivateApiKeyService(apiKeyId: string, userId: string) {
    const [row] = await db.update(apikeys).set({
        is_active: false
    }).where(
        and(
            eq(apikeys.id, apiKeyId),
            eq(apikeys.user_id, userId)
        )
    ).returning()

    if(!row) {
        throw new NotFoundError("Api key not found");
    }

    return { name : row.name, prefix: row.key_prefix }
}

export async function getAllApiKeysService(userId: string) {
    const rows = await db.select().from(apikeys).where( 
        eq(apikeys.user_id, userId)
    ).orderBy(desc(apikeys.created_at));

    return rows.map(row => ({
        id: row.id,
        name: row.name,
        prefix: row.key_prefix,
        isActive: row.is_active,
        createdAt: row.created_at,
        lastUsedAt: row.last_used_at,
        expiresAt: row.expires_at
    }));
}