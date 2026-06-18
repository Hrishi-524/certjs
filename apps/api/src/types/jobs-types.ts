export type RecipientData = Record<
    string,
    string | number
>;

export type CreateJobParams = {
    userId: string;

    templateId: string;

    recipients: RecipientData[];

    idempotencyKey: string;

    webhookUrl?: string;
};