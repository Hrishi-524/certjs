"use client";

import type { ComponentProps } from "react";
import Link from "next/link";

import {
    ArrowRight01Icon,
    CheckmarkCircle02Icon,
    Clock01Icon,
    Loading03Icon,
    Alert02Icon,
} from "@hugeicons/core-free-icons";

import { AppIcon } from "@/components/shared/app-icon";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { DashboardJob } from "@/types/dashboard.types";

type ActiveJobCardProps = {
    job: DashboardJob;
};

type BadgeVariant = ComponentProps<typeof Badge>["variant"];

const statusConfig = {
    pending: {
        label: "Pending",
        icon: Clock01Icon,
        variant: "secondary",
    },
    processing: {
        label: "Processing",
        icon: Loading03Icon,
        variant: "default",
    },
    completed: {
        label: "Completed",
        icon: CheckmarkCircle02Icon,
        variant: "default",
    },
    failed: {
        label: "Failed",
        icon: Alert02Icon,
        variant: "destructive",
    },
} satisfies Record<DashboardJob["status"], {
    label: string;
    icon: typeof Clock01Icon;
    variant: BadgeVariant;
}>;

export default function ActiveJobCard({
    job,
}: ActiveJobCardProps) {
    const progress =
        job.totalCount === 0
            ? 0
            : (job.processedCount / job.totalCount) * 100;

    const status = statusConfig[job.status];

    return (
        <Card size="sm">
            <CardHeader className="gap-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 space-y-1">
                        <CardTitle className="line-clamp-1 text-base">
                            {job.template.name}
                        </CardTitle>

                        <p className="text-xs text-muted-foreground">
                            {job.processedCount.toLocaleString()} of{" "}
                            {job.totalCount.toLocaleString()} documents
                        </p>
                    </div>

                    <Badge
                        variant={status.variant}
                        className="shrink-0"
                    >
                        <AppIcon
                            icon={status.icon}
                            size={14}
                        />

                        {status.label}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                <Progress value={progress} />

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                        {Math.round(progress)}%
                    </span>

                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="-mr-2 h-7"
                    >
                        <Link href={`/dashboard/jobs/${job.id}`}>
                            View

                            <AppIcon icon={ArrowRight01Icon} />
                        </Link>
                    </Button>
                </div>

                {job.failedCount > 0 && (
                    <p className="text-sm text-destructive">
                        {job.failedCount} document
                        {job.failedCount === 1 ? "" : "s"} failed
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
