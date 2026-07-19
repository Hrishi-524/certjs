import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
});

const bucket = process.env.S3_BUCKET_NAME!;
export default async function generatePresignedUrl(key: string) {
    const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
    });

    return getSignedUrl(
        s3,
        command,
        { expiresIn: 3600 } // 1 hour expiration
    );
}