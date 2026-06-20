import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
});

const bucket = process.env.S3_BUCKET_NAME!;

export const uploadZip = async (
    fileBuffer: Buffer,
    batch_job_id: string
) => {
    const key = `certjs/zips/${batch_job_id}.zip`;

    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: fileBuffer,
        ContentType: "application/zip",
    });

    await s3.send(command);

    return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
};