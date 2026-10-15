import type { Readable } from "node:stream";

export interface PutObjectInput {
    key: string;
    body: Buffer | Uint8Array | Readable;
    contentType?: string;
}

export interface ObjectStorage {
    put(input: PutObjectInput): Promise<void>;
    get(key: string): Promise<Buffer>;
    getStream(key: string): Promise<Readable>;
    delete(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
}
