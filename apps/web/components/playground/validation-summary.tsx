"use client";

import type {
    UploadedRow,
    ValidationResult,
} from "@/types/components/playground.types";
import { AppIcon } from "@/components/shared/app-icon";
import {
    CheckmarkCircle02Icon,
    CancelCircleIcon,
    File01Icon,
    Alert02Icon,
} from "@hugeicons/core-free-icons";
import {
    getRemovedEntryCount,
} from "@/lib/helpers/validation-report";

type ValidationSummaryProps = {
    validation: ValidationResult;
    rows: UploadedRow[];
    usableRows: UploadedRow[];
};

function ValidationSummary({
    validation,
    rows,
    usableRows,
}: ValidationSummaryProps) {
    const removedEntryCount = getRemovedEntryCount(rows.length, validation);

    return (
        <div className="grid gap-3 md:grid-cols-4">
            {/* Total Rows */}
            <div className="rounded-md border p-3">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                    <AppIcon icon={File01Icon} className="size-4" />
                    <span className="text-sm">Total Rows</span>
                </div>

                <p className="text-2xl font-semibold">
                    {rows.length}
                </p>
            </div>

            {/* Usable Entries */}
            <div className="rounded-md border p-3">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                    <AppIcon
                        icon={CheckmarkCircle02Icon}
                        className="size-4"
                    />
                    <span className="text-sm">Usable Entries</span>
                </div>

                <p className="text-2xl font-semibold text-emerald-500">
                    {usableRows.length}
                </p>
            </div>

            {/* Removed Entries */}
            <div className="rounded-md border p-3">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                    <AppIcon
                        icon={Alert02Icon}
                        className="size-4"
                    />
                    <span className="text-sm">Removed Entries</span>
                </div>

                <p className="text-2xl font-semibold text-amber-500">
                    {removedEntryCount}
                </p>
            </div>
            {/* Status */}
            <div className="rounded-md border p-3">
                <div className="mb-2 text-sm text-muted-foreground">
                    Status
                </div>

                {usableRows.length === rows.length ? (
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-500">
                        <AppIcon
                            icon={CheckmarkCircle02Icon}
                            className="size-4"
                        />
                        Ready
                    </div>
                ) : usableRows.length > 0 ? (
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-500">
                        <AppIcon
                            icon={Alert02Icon}
                            className="size-4"
                        />
                        Reviewable
                    </div>
                ) : (
                    <div className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive">
                        <AppIcon
                            icon={CancelCircleIcon}
                            className="size-4"
                        />
                        No Usable Entries
                    </div>
                )}
            </div>
        </div>
    );
}

export default ValidationSummary;
