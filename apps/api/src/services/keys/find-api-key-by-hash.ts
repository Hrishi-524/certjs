import { apiKeys, db } from "@certjs/db";
import { eq } from "drizzle-orm"
import crypto from "crypto"
import { BadRequestError, UnauthorizedError } from "#app/middleware/express-errors";

export async function findApiKeyByHash(apiKey: string) {
    const hash = crypto.createHash("sha256").update(apiKey).digest("hex");

    const [row] = await db.select().from(apiKeys).where(
        eq(apiKeys.keyHash, hash),
    )

    if(!row) {
        throw new UnauthorizedError("Api Key is invalid or disabled");
    }

    if(!row.isActive) {
        throw new UnauthorizedError("Api key is invalid or disabled")
    }

    if(row.expiresAt && row.expiresAt < new Date()) {
        throw new UnauthorizedError("Api key is expired")
    }

    return row.userId;
}
