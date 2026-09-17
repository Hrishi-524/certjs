import type {
    UploadedRow,
    ValidationIssueEntry,
    ValidationResult,
} from "@/types/components/playground.types";
import type { Placeholder } from "@/types/placeholders.types";
import type { JobDeliverySemantics, JobSemantics } from "@/types/jobs.types";

export function validateUpload(
    data: UploadedRow[],
    placeholders: Placeholder[],
    semantics: JobSemantics
): ValidationResult {
    // Base setup

    const sanitizedData: UploadedRow[] = [];

    const placeholderFields = new Set(placeholders.map((p) => p.key));
    
    const deliveryFields = new Map<string, JobDeliverySemantics>();
    const directEmailDeliveryValues: string[] = [];
    const directWebhookDeliveryValues: string[] = [];
    for(const delivery of semantics.deliveries) {
        if(delivery.scope === "batch" && delivery.channel === "email") {
            directEmailDeliveryValues.push(...delivery.destination.map((mail) => mail));
        }
        if(delivery.scope === "batch" && delivery.channel === "webhook") {
            directWebhookDeliveryValues.push(...delivery.destination.map((webhook) => webhook));
        }
        if(delivery.scope === "recipient") {
            for(const field of delivery.destination) {
                deliveryFields.set(field, delivery);
            }
        }
    }
    
    const identifierFields = new Set(semantics.identification.fields.map((f) => f));
    
    const allFields = new Set([...placeholderFields, ...deliveryFields.keys(), ...identifierFields ]);


    // Dataset structure validation

    const foundFields = data.length > 0 ? Object.keys(data[0]) : [];
    const missingFields = [...allFields].filter((key) => !foundFields.includes(key));
    const extraFields = foundFields.filter((key) => !allFields.has(key));
    
    // Dataset information validation

    const invalidEmails: ValidationIssueEntry[] = [];
    const invalidWebhookUrls: ValidationIssueEntry[]  = [];
    const emptyValues: ValidationIssueEntry[] = [];
    const duplicateIdentifiers: ValidationIssueEntry[] = [];
    const missingEntry: ValidationIssueEntry[] = [];
    const unexpectedEntry: ValidationIssueEntry[] = [];
    const invalidDirectEmails: ValidationIssueEntry[] = [];
    const invalidDirectWebhooks: ValidationIssueEntry[] = [];

    const uniqueFieldSet = new Set();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    const describeEmptyValue = (value: unknown): string => {
        if(value === null) return "null";
        if(value === undefined) return "undefined";
        if(typeof value === "string" && value.trim() === "") return "empty";
        return String(value);
    };

    data.forEach((entry, index) => {
        let deleteFlag = false;
        const unexpected: string[] = [];

        const identifierParts: string[] = [];
        const fields = Object.keys(entry);

        for(const expectedField of allFields) {
            if(!fields.includes(expectedField)) {
                missingEntry.push({
                    entry: index,
                    field: null,
                    warning: `${expectedField} is missing at ${index} entry! entry will be ignored.`
                })
                deleteFlag = true;
            }
        }

        for(const field of fields) {
            if(!allFields.has(field)) {
                unexpectedEntry.push({
                    entry: index,
                    field: field,
                    warning: `${field} is unexpected at ${index} entry! field will be ignored.`
                })
                unexpected.push(field);
            }
        }

        for(const [field, value] of Object.entries(entry)) {
            if(placeholderFields.has(field)) {
                if(value === null || value === undefined ||(typeof value === "string" && value.trim() === "")) {
                    emptyValues.push({
                        entry: index,
                        field: field,
                        warning: `${field} at ${index} has a ${describeEmptyValue(value)} value! certificate might get empty value`
                    })
                }
            }
            if(deliveryFields.has(field)) {
                const delivery = deliveryFields.get(field)!;
                if(delivery.channel === "email" && delivery.scope === "recipient") {
                    if(!emailRegex.test(String(value))) {
                        invalidEmails.push({
                            entry: index,
                            field: field,
                            warning: `${field} at ${index} has a ${value} which is not a valid email pattern! email delivery might fail for this entry`
                        })
                    }
                }
                if(delivery.channel === "webhook" && delivery.scope === "recipient") {
                    if(!urlRegex.test(String(value))) {
                        invalidWebhookUrls.push({
                            entry: index,
                            field: field,
                            warning: `${field} at ${index} has a invalid webhook url pattern ${value}! webhoook delivery might fail for this entry`
                        })
                    }
                }
            }
            if(identifierFields.has(field)) {
                identifierParts.push(value as string);
            }
        }

        if(!deleteFlag) {
            const identifierKey = identifierParts.join(semantics.identification.separator);
            if(uniqueFieldSet.has(identifierKey)) {
                duplicateIdentifiers.push({
                    entry: index,
                    field: null,
                    warning: `Duplicate identifier found at ${index} entry! This entry may cause filename conflicts which will be handled by collision resolution strategy ${semantics.identification.collision}`
                })
            } else {
                uniqueFieldSet.add(identifierKey);
            }

            if(unexpected.length > 0) {
                const sanitizedEntry = { ...entry };
                for(const field of unexpected) {
                    delete sanitizedEntry[field];
                }
                sanitizedData.push(sanitizedEntry);
            } else {
                sanitizedData.push(entry);
            } 
        }
    });

    for(const mail of directEmailDeliveryValues) {
        if(!emailRegex.test(mail)) {
            invalidDirectEmails.push({
                entry: null,
                field: null,
                warning: `${mail} is not valid email pattern present in direct emails! This will be skipped in delivery`
            })
        }
    }
    
    for(const webhook of directWebhookDeliveryValues) {
        if(!urlRegex.test(webhook)) {
            invalidDirectWebhooks.push({
                entry: null,
                field: null,
                warning: `${webhook} is not valid url pattern in direct webhooks! This will be skipped in delivery`
            })
        }
    }

    return {
        sanitizedData,
        structure: {
            foundFields,
            missingFields,
            extraFields,
            missingEntry,
            unexpectedEntry,
        },
        information: {
            placeholder: {
                emptyValues,
            },
            delivery: {
                invalidEmails,
                invalidWebhookUrls,
                invalidDirectEmails,
                invalidDirectWebhooks,
            },
            identification: {
                duplicateIdentifiers,
            }
        }
    };
}