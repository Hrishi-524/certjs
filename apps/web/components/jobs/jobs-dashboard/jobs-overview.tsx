"use client";

import {
    Alert02Icon,
    Clock01Icon,
    File01Icon,
    TaskDone01Icon,
} from "@hugeicons/core-free-icons";

import { AppIcon } from "@/components/shared/app-icon";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

type JobsOverviewProps = {
    total: number;
    active: number;
    completed: number;
    failed: number;
};

type OverviewCardProps = {
    title: string;
    value: number;
    subtitle: string;
    icon: typeof File01Icon;
    iconClassName?: string;
};

function OverviewCard({
    title,
    value,
    subtitle,
    icon,
    iconClassName,
}: OverviewCardProps) {
    return (
        <Card size="sm" className="shadow-sm">
            <CardContent className="flex items-center justify-between gap-4 p-4">
                <div className="min-w-0 space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {title}
                    </p>

                    <p className="text-3xl font-semibold leading-none tracking-tight tabular-nums">
                        {value}
                    </p>

                    <p className="truncate text-xs text-muted-foreground/80">
                        {subtitle}
                    </p>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
                    <AppIcon
                        icon={icon}
                        size={20}
                        className={iconClassName}
                    />
                </div>
            </CardContent>
        </Card>
    );
}

export default function JobsOverview({
    total,
    active,
    completed,
    failed,
}: JobsOverviewProps) {
    return (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <OverviewCard
                title="Total Jobs"
                value={total}
                subtitle="Batch jobs created"
                icon={File01Icon}
            />

            <OverviewCard
                title="Active"
                value={active}
                subtitle="Currently processing"
                icon={Clock01Icon}
                iconClassName="text-blue-600"
            />

            <OverviewCard
                title="Completed"
                value={completed}
                subtitle="Finished successfully"
                icon={TaskDone01Icon}
                iconClassName="text-green-600"
            />

            <OverviewCard
                title="Failed"
                value={failed}
                subtitle={
                    failed === 0
                        ? "No failed jobs"
                        : "Needs attention"
                }
                icon={Alert02Icon}
                iconClassName={
                    failed > 0
                        ? "text-destructive"
                        : ""
                }
            />
        </div>
    );
}
