import crypto from "crypto"

export function generateApiKey() {
    const prefix = "cj_live_" + crypto.randomBytes(8).toString("hex");

    const rnd = crypto.randomBytes(32).toString("base64url");

    const apikey = prefix + "_" +  rnd;

    const hash = crypto.createHash("sha256").update(apikey).digest("hex");

    return {
        apikey,
        hash,
        prefix
    }
}