import { performance } from "node:perf_hooks";
import * as crypto from "node:crypto";

import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
});

const bucket = process.env.S3_BUCKET_NAME!;

async function benchmark() {

    // Generate a 500 KB random file
    const buffer = crypto.randomBytes(500 * 1024);

    const key = `benchmarks/${Date.now()}.bin`;

    console.log(`Buffer Size: ${(buffer.length / 1024).toFixed(1)} KB`);
    console.log();

    // ---------------- Upload ----------------

    let start = performance.now();

    await s3.send(
        new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: buffer,
            ContentType: "application/octet-stream"
        })
    );

    console.log(
        `Upload: ${(performance.now() - start).toFixed(2)} ms`
    );

    // ---------------- GetObject ----------------

    start = performance.now();

    const response = await s3.send(
        new GetObjectCommand({
            Bucket: bucket,
            Key: key
        })
    );

    console.log(
        `GetObject Request: ${(performance.now() - start).toFixed(2)} ms`
    );

    // ---------------- Stream ----------------

    const chunks: Buffer[] = [];

    start = performance.now();

    for await (const chunk of response.Body as AsyncIterable<Uint8Array>) {
        chunks.push(Buffer.from(chunk));
    }

    console.log(
        `Read Stream: ${(performance.now() - start).toFixed(2)} ms`
    );

    // ---------------- Concat ----------------

    start = performance.now();

    const downloaded = Buffer.concat(chunks);

    console.log(
        `Buffer.concat(): ${(performance.now() - start).toFixed(2)} ms`
    );

    console.log();

    console.log(
        `Downloaded Size: ${(downloaded.length / 1024).toFixed(1)} KB`
    );

    console.log(
        `Buffers Equal: ${buffer.equals(downloaded)}`
    );
}

benchmark().catch(console.error);