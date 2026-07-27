export type CreateApiKeyInput = {
    name: string;          // min 3, max 60
    expiry?: string | null; // coerced to Date; must be in the future when present
}

export type CreateApiKeyResponse = {
    apikey: string;  // full API key; show/copy only once
    prefix: string;
    apiKeyId: string;
}

export type ListApiKeysResponse = Array<{
    id: string;
    name: string;
    prefix: string;
    isActive: boolean;
    createdAt: string;
    lastUsedAt: string | null;
    expiresAt: string | null;
}>

export type GetApiKeyPrefixResponse = {
    prefix: string;
}

export type DeactivateApiKeyResponse = {
    name: string;
    prefix: string;
}

export type ActivateApiKeyResponse = {
    name: string;
    prefix: string;
}