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
        <Card size="sm">
            <CardContent className="flex items-start justify-between p-4">
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <p className="text-2xl font-semibold tracking-tight tabular-nums">
                        {value}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        {subtitle}
                    </p>
                </div>

                <div className="rounded-lg border bg-muted/50 p-2">
                    <AppIcon
                        icon={icon}
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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
