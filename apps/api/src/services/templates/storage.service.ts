import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
});

const bucket = process.env.S3_BUCKET_NAME!;

export const uploadTemplateImage = async (
    fileBuffer: Buffer,
    mimeType: string,
    user_id: string,
    template_id: string,
) => {
    const key = `certjs/templates/${user_id}/${template_id}`;

    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: fileBuffer,
        ContentType: mimeType,
    });

    await s3.send(command);

    const url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return {
        key,
        url,
    };
};

export const deleteS3Object = async (key: string) => {
    const command = new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
    });

    await s3.send(command);
}