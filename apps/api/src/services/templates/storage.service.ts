import { storage } from "@certjs/storage";

export const uploadTemplateImage = async (
    fileBuffer: Buffer,
    mimeType: string,
    userId: string,
    templateId: string,
) => {
    const key = `certjs/templates/${userId}/${templateId}`;

    const input = {
        key,
        body: fileBuffer,
        contentType: mimeType,
    };

    await storage.put(input);

    return { key };
};

export const deleteStoredObject = async (key: string) => storage.delete(key);
