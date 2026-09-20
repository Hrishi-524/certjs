import type { UploadedRow, ValidationIssueEntry, ValidationResult } from "@/types/components/playground.types";
import type { Placeholder } from "@/types/placeholders.types";
import type { JobDeliverySemantics, JobSemantics, DeliveryContent } from "@/types/jobs.types";

export function validateUpload( data: UploadedRow[], placeholders: Placeholder[], semantics: JobSemantics ): ValidationResult {
    // Base setup
    const sanitizedData: UploadedRow[] = [];

    const placeholderFields = new Set(placeholders.map((p) => p.key));
    
    const deliveryFields = new Map<string, JobDeliverySemantics>();
    const directEmailDeliveryValues: string[] = [];
    const directWebhookDeliveryValues: string[] = [];
    let templateVariablesRecipient = new Set<string>(); 
    let templateVariablesBatch = new Set<string>();

    const missingVariableEntries: ValidationIssueEntry[] = [];
    const unexpectedVariableEntries: ValidationIssueEntry[] = [];

    for(const delivery of semantics.deliveries) { // O(4) ~ O(1) Only 4 unique combinations of delivery methods are possible, so this is constant time complexity
        // Method 1: Direct delivery via email or webhook
        if (delivery.scope === "batch" && delivery.channel === "email") {
            directEmailDeliveryValues.push(...delivery.destination);

            if (delivery.content) {
                templateVariablesBatch = parseTemplateVariables(delivery.content);

                delivery.content.data?.forEach((data, index) => {
                    for (const variable of templateVariablesBatch) {
                        if (!(variable in data)) {
                            missingVariableEntries.push({
                                entry: index,
                                field: variable,
                                warning: `${variable} is required by the email template but was not provided`,
                            });
                        }
                    }

                    // Report unexpected fields
                    for (const variable of Object.keys(data)) {
                        if (!templateVariablesBatch.has(variable)) {
                            unexpectedVariableEntries.push({
                                entry: index,
                                field: variable,
                                warning: `${variable} is not a valid template variable in the template! This will be ignored in delivery`,
                            });
                        }
                    }
                });
            }
        }

        // Method 2: Recipient based delivery via email or webhook
        if(delivery.scope === "batch" && delivery.channel === "webhook") {
            directWebhookDeliveryValues.push(...delivery.destination.map((webhook) => webhook));
        }

        // Method 3: Recipient based delivery via email or webhook
        if(delivery.scope === "recipient" && delivery.channel === "email") {
            for(const field of delivery.destination) { // O(n) ~ O(1) because the number of fields in a delivery is limited and small, so this is constant time complexity
                deliveryFields.set(field, delivery);
            }
            if(delivery.content) {
                templateVariablesRecipient = parseTemplateVariables(delivery.content);
            }
        }

        // Method 4: Recipient based delivery via email or webhook
        if(delivery.scope === "recipient" && delivery.channel === "webhook") {
            for(const field of delivery.destination) { // O(n) ~ O(1) because the number of fields in a delivery is limited and small, so this is constant time complexity
                deliveryFields.set(field, delivery);
            }
        }
    }
    
    const identifierFields = new Set(semantics.identification.fields.map((f) => f));
    
    const allFields = new Set([...placeholderFields, ...deliveryFields.keys(), ...identifierFields]);


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

        let identifierComplete = true;

        for(const expectedField of allFields) {
            if(!fields.includes(expectedField)) {
                if(placeholderFields.has(expectedField)) {
                    missingEntry.push({
                        entry: index,
                        field: null,
                        warning: `${expectedField} is missing at ${index} entry! entry will be ignored.`
                    })
                    deleteFlag = true;
                }
                if(deliveryFields.has(expectedField)) {
                    missingEntry.push({
                        entry: index,
                        field: null,
                        warning: `${expectedField} is missing at ${index} entry! delivery via this field will be skipped for this entry.`
                    })
                }
                if(identifierFields.has(expectedField)) {
                    missingEntry.push({
                        entry: index,
                        field: null,
                        warning: `${expectedField} is missing at ${index} entry! a generated document id will be used as filename fallback instead.`
                    })
                    identifierComplete = false;
                }
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

        for (const variable of templateVariablesRecipient) {
            if (!(variable in entry)) {
                missingVariableEntries.push({
                    entry: index,
                    field: variable,
                    warning: `${variable} is required by the email template but was not provided`,
                });
            }
        }

        if(!deleteFlag) {
            if(identifierComplete) {
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
                missingTemplateVariables: missingVariableEntries,
                unexpectedTemplateVariables: unexpectedVariableEntries,
            },
            identification: {
                duplicateIdentifiers,
            }
        }
    };
}

export function parseTemplateVariables(content: DeliveryContent): Set<string> {
    if(content === null) return new Set<string>(); 

    const templateVariables = new Set<string>();
    const fieldRegex = /\{\{\s*([^{}]+?)\s*\}\}/g;

    const extractFields = (text: string) => {
        let match: RegExpExecArray | null;

        while ((match = fieldRegex.exec(text)) !== null) {
            templateVariables.add(match[1].trim());
        }
    };

    if (content.body) {
        extractFields(content.body);
    }

    if (content.subject) {
        extractFields(content.subject);
    }

    return templateVariables;
}
