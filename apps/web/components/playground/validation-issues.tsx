"use client";

import type { ValidationResult } from "@/types/components/playground.types";

type ValidationIssuesProps = {
    validation: ValidationResult;
};

function ValidationIssues({
    validation,
}: ValidationIssuesProps) {
    const hasIssues =
        validation.missingColumns.length > 0 ||
        validation.extraColumns.length > 0 ||
        validation.invalidRows.length > 0;

    if (!hasIssues) {
        return (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3">
                <p className="font-medium text-emerald-500">
                    Validation successful
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                    All uploaded rows are valid and ready for certificate
                    generation.
                </p>
            </div>
        );
    }

    return (
        <div className="max-h-96 space-y-4 overflow-y-auto pr-2">
            {/* Missing Columns */}
            {validation.missingColumns.length > 0 && (
                <div>
                    <h3 className="mb-2 font-medium text-destructive">
                        Missing Required Columns
                    </h3>

                    <ul className="list-disc space-y-1 pl-5 text-sm">
                        {validation.missingColumns.map((column) => (
                            <li key={column}>{column}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Extra Columns */}
            {validation.extraColumns.length > 0 && (
                <div>
                    <h3 className="mb-2 font-medium text-amber-500">
                        Extra Columns
                    </h3>

                    <ul className="list-disc space-y-1 pl-5 text-sm">
                        {validation.extraColumns.map((column) => (
                            <li key={column}>{column}</li>
                        ))}
                    </ul>

                    <p className="mt-2 text-xs text-muted-foreground">
                        These columns will be ignored during certificate
                        generation.
                    </p>
                </div>
            )}

            {/* Invalid Rows */}
            {validation.invalidRows.length > 0 && (
                <div>
                    <h3 className="mb-3 font-medium text-destructive">
                        Invalid Rows ({validation.invalidRows.length})
                    </h3>

                    <div className="space-y-3">
                        {validation.invalidRows.map((row) => (
                            <div
                                key={row.row}
                                className="rounded-md border border-destructive/20 bg-destructive/5 p-3"
                            >
                                <p className="mb-2 text-sm font-medium">
                                    Row {row.row}
                                </p>

                                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                                    {row.errors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ValidationIssues;
