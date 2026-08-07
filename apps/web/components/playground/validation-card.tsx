"use client";

import { Button } from "@/components/ui/button";
import type { ValidationResult } from "@/types/components/playground.types";
import ValidationSummary from "./validation-summary";
import ValidationIssues from "./validation-issues";

type ValidationCardProps = {
    validation: ValidationResult;
    onContinue?: () => void;
};

function ValidationCard({
    validation,
    onContinue,
}: ValidationCardProps) {
    const validCount = validation.validRows.length;
    const invalidCount = validation.invalidRows.length;

    const canContinue = validCount > 0;

    return (
        <section>
            <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-4 border-b pb-3">
                    <div className="flex items-center gap-3">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full border bg-muted text-xs font-semibold text-muted-foreground">
                            2
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
                        Step 2 / 4
                    </span>
                </div>

                <div className="space-y-4">
                    <ValidationSummary validation={validation} />

                    <ValidationIssues validation={validation} />

                    {canContinue && (
                        <div className="border-t pt-4">
                            <p className="mb-3 text-sm text-muted-foreground">
                                {invalidCount === 0
                                    ? `All ${validCount} recipient${validCount === 1 ? "" : "s"} are ready for certificate generation.`
                                    : `${validCount} recipient${validCount === 1 ? "" : "s"} recipients are ready. ${invalidCount} invalid row${invalidCount === 1 ? "" : "s"} will be skipped if you continue.`}
                            </p>

                            <Button
                                onClick={onContinue}
                            >
                                {invalidCount === 0
                                    ? "Continue"
                                    : `Continue with ${validCount} Valid Row${validCount === 1 ? "" : "s"}`}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ValidationCard;
