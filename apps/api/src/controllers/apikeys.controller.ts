import { apiKeyIdSchema, createApiKeySchema } from "#app/schema/apikeys.schema";
import { createApiKeyService, getPrefix, deleteApiKeyService, deActivateApiKeyService, getAllApiKeysService } from "#app/services/keys/apikeys.servie";
import { Request, Response } from "express";

export async function createApiKey(req: Request, res: Response) {
    const userId = req.user!.id;

    const { name, expiry } = createApiKeySchema.parse(req.body)

    const { apikey, prefix, apiKeyId } = await createApiKeyService(userId, name, expiry)

    res.status(201).json({ 
        apikey,
        prefix,
        apiKeyId
    });
}

export async function getAllApiKeys(req: Request, res: Response) {
    const userId = req.user!.id;
    
    const apiKeys = await getAllApiKeysService(userId);

    res.status(200).json(apiKeys);
    /*
        Refrence for the type of apiKeys array :-
        const apiKeys: {
            id: string;
            name: string;
            prefix: string;
            isActive: boolean;
            createdAt: Date;
            lastUsedAt: Date | null;
            expiresAt: Date | null;
        }[]
    */
}

export async function getApiKey(req: Request, res: Response) {
    const userId = req.user!.id;

    const {apiKeyId} = apiKeyIdSchema.parse(req.params);

    const prefix = await getPrefix(apiKeyId, userId);
    
    res.status(200).json({ 
        prefix
    });
}

export async function deleteApiKey(req: Request, res: Response) {
    const userId = req.user!.id;

    const {apiKeyId} = apiKeyIdSchema.parse(req.params);

    await deleteApiKeyService(apiKeyId, userId);

    res.status(204).send();
}

export async function deActivateApiKey(req: Request, res: Response) {
    const userId = req.user!.id;

    const {apiKeyId} = apiKeyIdSchema.parse(req.params);

    const { name, prefix } =  await deActivateApiKeyService(apiKeyId, userId);

    res.status(200).json({ name, prefix });
}