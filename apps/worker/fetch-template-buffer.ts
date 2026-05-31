import dotenv from "dotenv";
dotenv.config();

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
});

const bucket = process.env.S3_BUCKET_NAME!;

export default async function fetchTemplateBuffer(
    templateUrl: string
):  Promise<Buffer> {
    try {
        
        const key = templateUrl.split(
            `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`
        )[1];

        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: key,
        });


        
        const response = await s3.send(command);

        if (!response.Body) {
            throw new Error("Empty S3 response body");
        }

        const chunks: Uint8Array[] = [];

        for await (const chunk of response.Body as any) {
            chunks.push(chunk);
        }

        return Buffer.concat(chunks);
    } catch (err) {
        console.error("Error fetching template:", err);
        throw err;
    }
}