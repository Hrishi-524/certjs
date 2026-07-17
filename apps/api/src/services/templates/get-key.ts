export function getKeyForS3Url(s3Url: string): string {
    try {
        const url = new URL(s3Url);
        return url.pathname.substring(1); // Remove the leading '/'
    } catch (error) {
        throw new Error(`Invalid S3 URL: ${s3Url}`);
    }
}