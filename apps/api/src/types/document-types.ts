export type Document = {
    id: string;
    job_id: string;
    recipient_data: Record<string, string | number>;
    status: "pending" | "processing" | "completed" | "failed";
    error: string | null;
    verify_token: string;
    s3_url: string | null;
    created_at: Date;
}