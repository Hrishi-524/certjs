import { apikeys, db } from "@certjs/db";
import { eq } from "drizzle-orm"
import crypto from "crypto"
import { BadRequestError, UnauthorizedError } from "@/middleware/express-errors";

export async function findApiKeyByHash(apiKey: string) {
    const hash = crypto.createHash("sha256").update(apiKey).digest("hex");

    const [row] = await db.select().from(apikeys).where(
        eq(apikeys.key_hash, hash),
    )

    if(!row) {
        throw new UnauthorizedError("Api Key is invalid or disabled");
    }

    if(!row.is_active) {
        throw new UnauthorizedError("Api key is invalid or disabled")
    }

    if(row.expires_at && row.expires_at < new Date()) {
        throw new UnauthorizedError("Api key is expired")
    }

    return row.user_id;
}