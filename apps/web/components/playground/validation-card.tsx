"use client";

import { Button } from "@/components/ui/button";
import type {
    UploadedRow,
    ValidationResult,
} from "@/types/components/playground.types";
import ValidationSummary from "./validation-summary";
import ValidationIssues from "./validation-issues";

type ValidationCardProps = {
    validation: ValidationResult;
    rows: UploadedRow[];
    usableRows: UploadedRow[];
    onContinue?: () => void;
};

function ValidationCard({
    validation,
    rows,
    usableRows,
    onContinue,
}: ValidationCardProps) {
    const usableCount = usableRows.length;
    const totalCount = rows.length;
    const removedCount = Math.max(0, totalCount - usableCount);

    const canContinue = usableCount > 0;

    return (
        <section>
            <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-4 border-b pb-3">
                    <div className="flex items-center gap-3">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full border bg-muted text-xs font-semibold text-muted-foreground">
                            3
                        </span>
                        <div>
                            <h2 className="text-base font-semibold">
                                Validate
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Review the uploaded dataset before generating certificates.
                            </p>
                        </div>
                    </div>
                    <span className="shrink-0 rounded-full border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        Step 3 / 5
                    </span>
                </div>

                <div className="space-y-4">
                    <ValidationSummary
                        validation={validation}
                        rows={rows}
                        usableRows={usableRows}
                    />

                    <ValidationIssues validation={validation} />

                    {canContinue && (
                        <div className="border-t pt-4">
                            <p className="mb-3 text-sm text-muted-foreground">
                                {removedCount === 0
                                    ? `All ${usableCount} entr${usableCount === 1 ? "y" : "ies"} are ready for certificate generation.`
                                    : `${usableCount} of ${totalCount} entr${totalCount === 1 ? "y" : "ies"} will continue after validation cleanup.`}
                            </p>

                            <Button
                                onClick={onContinue}
                            >
                                Proceed with {usableCount} / {totalCount} entries
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ValidationCard;
