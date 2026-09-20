export type Entry = Record<string, string | number>;

export type PlaygroundPreviewInput = {
    templateId: string;
    recipient: Record<string, string | number>;
};

export type CreateJobParams = {
    userId: string;
    templateId: string;
    recipients: Entry[];
    idempotencyKey: string;
    semantics: Semantics;
};

export type ValidationResult = {
    sanitizedData: Entry[];
    structure: {
        foundFields: string[];
        missingFields: string[];
        extraFields: string[];
        missingEntry: ValidationIssueEntry[];
        unexpectedEntry: ValidationIssueEntry[];
    };
    information: {
        placeholder: {
            emptyValues: ValidationIssueEntry[];
        };
        delivery: {
            invalidEmails: ValidationIssueEntry[];
            invalidWebhookUrls: ValidationIssueEntry[];
            invalidDirectEmails: ValidationIssueEntry[];
            invalidDirectWebhooks: ValidationIssueEntry[];
            missingTemplateVariables: ValidationIssueEntry[];
            unexpectedTemplateVariables: ValidationIssueEntry[];
        };
        identification: {
            duplicateIdentifiers: ValidationIssueEntry[];
        };
    };
};

export type ValidationIssueEntry = {
    entry: number | null;
    field: string | null;
    warning: string;
};

export type DeliveryContent = {
    sender: string | null;
    subject: string;
    body: string;
    data?: Entry[] | null;
};

export type Delivery = {
    channel: "email" | "webhook";
    scope: "recipient" | "batch";
    destination: string[];
    content: DeliveryContent | null;
};

export type Identification = {
    fields: string[];
    separator?: string; // default " "
    case?: "lower" | "upper" | "preserve"; // default "preserve"
    collision?: "prefix" | "suffix"; // default "suffix"
    docId?: boolean; // default false
};

export type Semantics = {
    deliveries: Delivery[];
    identification: Identification;
    dashboardPersistence: boolean;
};