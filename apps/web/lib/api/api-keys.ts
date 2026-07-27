import clientApi from "@/lib/api/client";
import { CreateApiKeyInput, CreateApiKeyResponse, DeactivateApiKeyResponse, ActivateApiKeyResponse, GetApiKeyPrefixResponse, ListApiKeysResponse } from "@/types/api-keys.types";

export async function createApiKey(input: CreateApiKeyInput): Promise<CreateApiKeyResponse> {
    const { data } = await clientApi.post<CreateApiKeyResponse>("dashboard/api-keys", input)
    return data
}

export async function listApiKeys(): Promise<ListApiKeysResponse> {
    const { data } = await clientApi.get<ListApiKeysResponse>("dashboard/api-keys")
    return data
}

export async function getApiKeyPrefix(apiKeyId: string): Promise<GetApiKeyPrefixResponse> {
    const { data } = await clientApi.get<GetApiKeyPrefixResponse>(`dashboard/api-keys/${apiKeyId}`)
    return data
} 

export async function deleteApiKey(apiKeyId: string): Promise<void> {
    await clientApi.delete<void>(`dashboard/api-keys/${apiKeyId}`)
}

export async function deactivateApiKey(apiKeyId: string): Promise<DeactivateApiKeyResponse> {
    const { data } = await clientApi.post<DeactivateApiKeyResponse>(`dashboard/api-keys/${apiKeyId}/deactivate`)
    return data
}

export async function activateApiKey(apiKeyId: string): Promise<ActivateApiKeyResponse> {
    const { data } = await clientApi.post<ActivateApiKeyResponse>(`dashboard/api-keys/${apiKeyId}/activate`)
    return data
}
