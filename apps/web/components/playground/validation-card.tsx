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
        <section className="mx-auto w-full max-w-7xl px-8 pb-8">
            <div className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
                <div className="mb-5 border-b pb-4">
                    <h2 className="text-base font-semibold">
                        Validation
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Review the uploaded dataset before generating certificates.
                    </p>
                </div>

                <div className="space-y-6">
                    <ValidationSummary validation={validation} />

                    <ValidationIssues validation={validation} />

                    {canContinue && (
                        <div className="border-t pt-6">
                            <p className="mb-4 text-sm text-muted-foreground">
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