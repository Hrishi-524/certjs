import type {
    ValidationIssueEntry,
    ValidationResult,
} from "@/types/components/playground.types";

export type ValidationIssueSeverity = "blocking" | "warning";

export type ValidationIssueSummary = {
    group: string;
    label: string;
    count: number;
    severity: ValidationIssueSeverity;
};

type IssueArrayCategory = {
    group: string;
    label: string;
    severity: ValidationIssueSeverity;
    issues: ValidationIssueEntry[];
};

type FieldArrayCategory = {
    group: string;
    label: string;
    severity: ValidationIssueSeverity;
    fields: string[];
};

function getIssueArrayCategories(
    validation: ValidationResult
): IssueArrayCategory[] {
    return [
        {
            group: "Structure",
            label: "Missing entries",
            severity: "blocking",
            issues: validation.structure.missingEntry,
        },
        {
            group: "Structure",
            label: "Unexpected entries",
            severity: "blocking",
            issues: validation.structure.unexpectedEntry,
        },
        {
            group: "Certificate Data / Placeholder",
            label: "Empty values",
            severity: "blocking",
            issues: validation.information.placeholder.emptyValues,
        },
        {
            group: "Delivery",
            label: "Invalid recipient emails",
            severity: "warning",
            issues: validation.information.delivery.invalidEmails,
        },
        {
            group: "Delivery",
            label: "Invalid recipient webhook URLs",
            severity: "warning",
            issues: validation.information.delivery.invalidWebhookUrls,
        },
        {
            group: "Delivery",
            label: "Invalid direct emails",
            severity: "warning",
            issues: validation.information.delivery.invalidDirectEmails,
        },
        {
            group: "Delivery",
            label: "Invalid direct webhook URLs",
            severity: "warning",
            issues: validation.information.delivery.invalidDirectWebhooks,
        },
        {
            group: "Identification",
            label: "Duplicate identifiers",
            severity: "warning",
            issues: validation.information.identification.duplicateIdentifiers,
        },
    ];
}

function getFieldArrayCategories(
    validation: ValidationResult
): FieldArrayCategory[] {
    return [
        {
            group: "Structure",
            label: "Missing fields",
            severity: "blocking",
            fields: validation.structure.missingFields,
        },
        {
            group: "Structure",
            label: "Extra fields",
            severity: "warning",
            fields: validation.structure.extraFields,
        },
    ];
}

export function getValidationIssueSummaries(
    validation: ValidationResult
): ValidationIssueSummary[] {
    return [
        ...getFieldArrayCategories(validation).map((category) => ({
            group: category.group,
            label: category.label,
            count: category.fields.length,
            severity: category.severity,
        })),
        ...getIssueArrayCategories(validation).map((category) => ({
            group: category.group,
            label: category.label,
            count: category.issues.length,
            severity: category.severity,
        })),
    ];
}

export function hasValidationIssues(validation: ValidationResult) {
    return getValidationIssueSummaries(validation).some(
        (summary) => summary.count > 0
    );
}

export function hasBlockingValidationIssues(validation: ValidationResult) {
    return getValidationIssueSummaries(validation).some(
        (summary) => summary.severity === "blocking" && summary.count > 0
    );
}

export function getRemovedEntryCount(
    originalEntryCount: number,
    validation: ValidationResult
) {
    return Math.max(0, originalEntryCount - validation.sanitizedData.length);
}

function formatIssue(issue: ValidationIssueEntry) {
    const entry = typeof issue.entry === "number" ? issue.entry : null;

    return {
        entry,
        row: entry === null ? null : entry + 1,
        field: issue.field,
        warning: issue.warning,
    };
}

export function buildDetailedValidationIssues(validation: ValidationResult) {
    const fieldDetails = getFieldArrayCategories(validation).flatMap(
        (category) =>
            category.fields.map((field) => ({
                category: category.label,
                group: category.group,
                severity: category.severity,
                entry: null,
                row: null,
                field,
                warning: `${category.label}: ${field}`,
            }))
    );

    const issueDetails = getIssueArrayCategories(validation).flatMap(
        (category) =>
            category.issues.map((issue) => ({
                category: category.label,
                group: category.group,
                severity: category.severity,
                ...formatIssue(issue),
            }))
    );

    return {
        generatedAt: new Date().toISOString(),
        issues: [...fieldDetails, ...issueDetails],
    };
}

export function downloadDetailedValidationIssues(validation: ValidationResult) {
    const blob = new Blob(
        [JSON.stringify(buildDetailedValidationIssues(validation), null, 2)],
        { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "validation-issues.json";
    link.click();
    URL.revokeObjectURL(url);
}
