"use client";

import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/shared/app-icon";
import {
    Alert02Icon,
    CheckmarkCircle02Icon,
    Download04Icon,
} from "@hugeicons/core-free-icons";
import {
    downloadDetailedValidationIssues,
    getValidationIssueSummaries,
    hasValidationIssues,
    type ValidationIssueSeverity,
} from "@/lib/helpers/validation-report";
import type { ValidationResult } from "@/types/components/playground.types";

type ValidationIssuesProps = {
    validation: ValidationResult;
};

const groupOrder = [
    "Structure",
    "Certificate Data / Placeholder",
    "Delivery",
    "Identification",
];

const severityStyles: Record<
    ValidationIssueSeverity,
    {
        row: string;
        badge: string;
        icon: typeof Alert02Icon;
        label: string;
    }
> = {
    blocking: {
        row: "border-destructive/25 bg-destructive/5",
        badge: "bg-destructive/10 text-destructive",
        icon: Alert02Icon,
        label: "Blocking",
    },
    warning: {
        row: "border-amber-500/25 bg-amber-500/5",
        badge: "bg-amber-500/10 text-amber-600",
        icon: Alert02Icon,
        label: "Warning",
    },
};

function ValidationIssues({ validation }: ValidationIssuesProps) {
    const summaries = getValidationIssueSummaries(validation).filter(
        (summary) => summary.count > 0
    );

    if (!hasValidationIssues(validation)) {
        return (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3">
                <div className="flex items-center gap-2 font-medium text-emerald-500">
                    <AppIcon icon={CheckmarkCircle02Icon} className="size-4" />
                    <span>Validation successful</span>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                    No issues were found in the uploaded dataset.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {groupOrder.map((group) => {
                const groupSummaries = summaries.filter(
                    (summary) => summary.group === group
                );

                if (groupSummaries.length === 0) {
                    return null;
                }

                return (
                    <div key={group} className="space-y-2">
                        <h3 className="text-sm font-medium text-foreground">
                            {group}
                        </h3>

                        <div className="grid gap-2 md:grid-cols-2">
                            {groupSummaries.map((summary) => {
                                const styles =
                                    severityStyles[summary.severity];

                                return (
                                    <div
                                        key={`${summary.group}-${summary.label}`}
                                        className={`flex items-center justify-between gap-3 rounded-md border px-3 py-2 ${styles.row}`}
                                    >
                                        <div className="flex min-w-0 items-center gap-2">
                                            <AppIcon
                                                icon={styles.icon}
                                                className="size-4 shrink-0"
                                            />
                                            <span className="truncate text-sm font-medium">
                                                {summary.label}
                                            </span>
                                        </div>

                                        <div className="flex shrink-0 items-center gap-2">
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles.badge}`}
                                            >
                                                {styles.label}
                                            </span>
                                            <span className="text-sm font-semibold">
                                                {summary.count}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}

            <div className="flex justify-end border-t pt-3">
                <Button
                    variant="outline"
                    type="button"
                    onClick={() => downloadDetailedValidationIssues(validation)}
                >
                    <AppIcon icon={Download04Icon} className="mr-2 size-4" />
                    Download detailed issues
                </Button>
            </div>
        </div>
    );
}

export default ValidationIssues;
