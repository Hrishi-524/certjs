import {
    DeleteObjectCommand,
    GetObjectCommand,
    HeadObjectCommand,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";

import type {
    ObjectStorage,
    PutObjectInput,
} from "@certjs/storage-contract";

import { Readable } from "node:stream";

export class S3Storage implements ObjectStorage {
    private readonly client: S3Client;
    private readonly bucket: string;

    constructor() {
        this.client = new S3Client({
            region: process.env.AWS_REGION,
        });

        const bucket = process.env.AWS_S3_BUCKET;

        if (!bucket) {
            throw new Error("AWS_S3_BUCKET is not configured");
        }

        this.bucket = bucket;
    }

    async put(input: PutObjectInput): Promise<void> {
        await this.client.send(
            new PutObjectCommand({
                Bucket: this.bucket,
                Key: input.key,
                Body: input.body,
                ContentType: input.contentType,
            })
        );
    }

    async get(key: string): Promise<Buffer> {
        const response = await this.client.send(
            new GetObjectCommand({
                Bucket: this.bucket,
                Key: key,
            })
        );

        if (!response.Body) {
            throw new Error(`Object not found: ${key}`);
        }

        return Buffer.from(
            await response.Body.transformToByteArray()
        );
    }

    async getStream(key: string): Promise<Readable> {
        const response = await this.client.send(
            new GetObjectCommand({
                Bucket: this.bucket,
                Key: key,
            }),
        );

        if (!response.Body) {
            throw new Error(`Storage returned an empty body for: ${key}`);
        }

        return Readable.from(
            response.Body as AsyncIterable<Uint8Array>,
        );
    }

    async delete(key: string): Promise<void> {
        await this.client.send(
            new DeleteObjectCommand({
                Bucket: this.bucket,
                Key: key,
            })
        );
    }

    async exists(key: string): Promise<boolean> {
        try {
            await this.client.send(
                new HeadObjectCommand({
                    Bucket: this.bucket,
                    Key: key,
                })
            );

            return true;
        } catch {
            return false;
        }
    }
}
