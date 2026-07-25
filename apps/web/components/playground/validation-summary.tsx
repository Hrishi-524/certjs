"use client";

import type { ValidationResult } from "@/types/components/playground.types";
import { AppIcon } from "@/components/shared/app-icon";
import {
    CheckmarkCircle02Icon,
    CancelCircleIcon,
    File01Icon,
    TaskDone01Icon,
    Alert02Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

type ValidationSummaryProps = {
    validation: ValidationResult;
};

function ValidationSummary({ validation }: ValidationSummaryProps) {
    return (
        <div className="grid gap-4 md:grid-cols-4">
            {/* Total Rows */}
            <div className="rounded-lg border p-4">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                    <AppIcon icon={File01Icon} className="size-4" />
                    <span className="text-sm">Total Rows</span>
                </div>

                <p className="text-2xl font-semibold">
                    {validation.rowCount}
                </p>
            </div>

            {/* Valid Rows */}
            <div className="rounded-lg border p-4">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                    <AppIcon
                        icon={CheckmarkCircle02Icon}
                        className="size-4"
                    />
                    <span className="text-sm">Valid Rows</span>
                </div>

                <p className="text-2xl font-semibold text-emerald-500">
                    {validation.validRows.length}
                </p>
            </div>

            {/* Invalid Rows */}
            <div className="rounded-lg border p-4">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                    <AppIcon
                        icon={Alert02Icon}
                        className="size-4"
                    />
                    <span className="text-sm">Invalid Rows</span>
                </div>

                <p className="text-2xl font-semibold text-amber-500">
                    {validation.invalidRows.length}
                </p>
            </div>
{/* Status */}
<div className="rounded-lg border p-4">
    <div className="mb-2 text-sm text-muted-foreground">
        Status
    </div>

    {validation.invalidRows.length === 0 ? (
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-500">
            <AppIcon
                icon={CheckmarkCircle02Icon}
                className="size-4"
            />
            Ready
        </div>
    ) : validation.validRows.length > 0 ? (
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-500">
            <AppIcon
                icon={Alert02Icon}
                className="size-4"
            />
            Partially Valid
        </div>
    ) : (
        <div className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive">
            <AppIcon
                icon={CancelCircleIcon}
                className="size-4"
            />
            Validation Failed
        </div>
    )}
</div>
        </div>
    );
}

export default ValidationSummary;