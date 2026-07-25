import type { InvalidRow, RecipientData, UploadedRow, ValidationResult } from "@/types/components/playground.types";
import type { Placeholder } from "@/types/placeholders.types";

export function validateUpload(data: UploadedRow[], placeholders: Placeholder[]): ValidationResult {
    // Dataset Validation
    const requiredColumns = placeholders.map((p) => p.key);
    const expectedKeys = new Set(requiredColumns);
    const foundColumns = data.length > 0 ? Object.keys(data[0]) : [];
    const missingColumns = requiredColumns.filter((key) => !foundColumns.includes(key));
    const extraColumns = foundColumns.filter((key) => !expectedKeys.has(key));

    
    // Row Validation
    const warnings: string[] = [];
    const validRows: UploadedRow[] = [];
    const invalidRows: InvalidRow[] = [];

    data.forEach((row, index) => {
        const rowErrors: string[] = [];
        const rowKeys = Object.keys(row);

        // JSON specific (CSV/Excel naturally pass this)
        for(const key of requiredColumns) {
            if(!rowKeys.includes(key)) {
                rowErrors.push(`Missing column "${key}"`);
            }
        }

        for(const key of rowKeys) {
            if(!expectedKeys.has(key)) {
                rowErrors.push(`Unexpected column "${key}"`);
            }
        }

    
        // Validate values and types
        for(const placeholder of placeholders) {
            const value = row[placeholder.key];
            if (value === null || value === undefined ||(typeof value === "string" && value.trim() === "")) {
                rowErrors.push(`"${placeholder.key}" is empty`);
            }

            /*
            * TODO:
            * switch (placeholder.type)
            * {
            *   case "number":
            *   case "date":
            *   case "email":
            * }
            */
        }

        if (rowErrors.length === 0) {
            validRows.push(row);
        } else {
            invalidRows.push({
                row: index + 1,
                data: row,
                errors: rowErrors,
                warnings: []
            });
        }
    });

    // Build result
    return {
        isValid: missingColumns.length === 0 && validRows.length > 0,
        rowCount: data.length,
        foundColumns,
        missingColumns,
        extraColumns,
        validRows,
        invalidRows,
    };
}