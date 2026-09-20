// export type UploadedRow = Record<string, unknown>;
export type UploadedRow = Record<string, string | number>;

export type RecipientData = Record<string, string | number>;

export type ValidationIssueEntry = {
    entry: number | null;
    field: string | null;
    warning: string;
};

export type ValidationResult = {
    sanitizedData: UploadedRow[];
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
