import { S3Storage } from "@certjs/storage-s3";
import type { ObjectStorage } from "@certjs/storage-contract";

export type { ObjectStorage, PutObjectInput } from "@certjs/storage-contract";

const provider = process.env.STORAGE_PROVIDER ?? "s3";

function createStorage(): ObjectStorage {
    switch (provider) {
        case "s3":
            return new S3Storage();
        default:
            throw new Error(`Unsupported STORAGE_PROVIDER: ${provider}`);
    }
}

export const storage = createStorage();
