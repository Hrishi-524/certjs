"use client";

import {
    Alert02Icon,
    RefreshIcon,
    TaskDone01Icon,
    File01Icon,
} from "@hugeicons/core-free-icons";

import { AppIcon } from "@/components/shared/app-icon";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import type { GetBatchJobStatusResponse } from "@/types/jobs.types";

type JobStatisticsProps = {
    job: GetBatchJobStatusResponse;
};

type StatCardProps = {
    title: string;
    value: string | number;
    subtitle: string;
    icon: any;
    iconClassName?: string;
};

function StatCard({
    title,
    value,
    subtitle,
    icon,
    iconClassName,
}: StatCardProps) {
    return (
        <Card>
            <CardContent className="flex items-start justify-between p-6">
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <p className="text-3xl font-bold tracking-tight tabular-nums">
                        {value}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        {subtitle}
                    </p>
                </div>

                <div className="rounded-lg border bg-muted/40 p-2">
                    <AppIcon
                        icon={icon}
                        className={iconClassName}
                    />
                </div>
            </CardContent>
        </Card>
    );
}

export default function JobStatistics({
    job,
}: JobStatisticsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
                title="Generated"
                value={job.meta.processedCount}
                subtitle="Completed successfully"
                icon={TaskDone01Icon}
                iconClassName="text-green-600"
            />

            <StatCard
                title="Total"
                value={job.meta.totalCount}
                subtitle="Certificates"
                icon={File01Icon}
            />

            <StatCard
                title="Failed"
                value={job.meta.failedCount}
                subtitle={
                    job.meta.failedCount === 0
                        ? "No failures"
                        : "Need attention"
                }
                icon={Alert02Icon}
                iconClassName={
                    job.meta.failedCount > 0
                        ? "text-destructive"
                        : ""
                }
            />

            <StatCard
                title="Retries"
                value={`${job.meta.retryCount} / ${job.meta.maxRetries}`}
                subtitle="Attempts used"
                icon={RefreshIcon}
            />
        </div>
    );
}