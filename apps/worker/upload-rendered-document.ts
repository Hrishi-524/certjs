import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
});

const bucket = process.env.S3_BUCKET_NAME!;

export const uploadGeneratedCertificate = async (
    fileBuffer: Buffer,
    document_id: string
) => {
    const key = `certjs/documents/${document_id}.png`;

    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: fileBuffer,
        ContentType: "image/png",
    });

    await s3.send(command);

    return {
        key,
        url: `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
    };
};