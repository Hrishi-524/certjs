import dotenv from "dotenv";
dotenv.config();

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Profiler, type WorkerName } from "./utils/profiler";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
});

const bucket = process.env.S3_BUCKET_NAME!;

export default async function fetchFileBuffer(
    url: string,
    worker: WorkerName,
):  Promise<Buffer> {
    try {
        
        /*
            When it is certficate fetch key will be:
                `certjs/documents/${document_id}.png`;
            When it is template fetch key will be:
                `certjs/templates/${user_id}/${template_id}`
            
        */
        const key = url.split(
            `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`
        )[1];

        const requestProfiler = new Profiler({
            worker: worker,
            operation: "Fetch S3 Object",
            keyId: key,
        });
        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: key,
        });
        
        const response = await s3.send(command);
        requestProfiler.end();

        if (!response.Body) {
            throw new Error("Empty S3 response body");
        }

        const chunks: Uint8Array[] = [];

        const streamProfiler = new Profiler({
            worker: worker,
            operation: "Stream S3 Object",
            keyId: key,
        });
        for await (const chunk of response.Body as any) {
            chunks.push(chunk);
        }
        streamProfiler.end();

        const concatProfiler = new Profiler({
            worker: worker,
            operation: "Concatenate S3 Object Chunks",
            keyId: key,
        })
        const buffer = Buffer.concat(chunks);
        concatProfiler.end();

        return buffer;
    } catch (err) {
        console.error("Error fetching template:", err);
        throw err;
    }
}