"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

import {
    Alert02Icon,
    ArrowRight01Icon,
    CheckmarkCircle02Icon,
    Clock01Icon,
    Loading03Icon,
} from "@hugeicons/core-free-icons";

import { AppIcon } from "@/components/shared/app-icon";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { DashboardRecentJob } from "@/types/dashboard.types";

type RecentJobCardProps = {
    job: DashboardRecentJob;
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
} satisfies Record<DashboardRecentJob["status"], {
    label: string;
    icon: typeof Clock01Icon;
    variant: BadgeVariant;
}>;

export default function RecentJobCard({
    job,
}: RecentJobCardProps) {
    const status = statusConfig[job.status];

    return (
        <Card size="sm">
            <CardHeader className="flex flex-row items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                    <CardTitle className="line-clamp-1 text-base">
                        {job.template.name}
                    </CardTitle>

                    <p className="text-xs text-muted-foreground">
                        Completed{" "}
                        {formatDistanceToNow(new Date(job.completedAt), {
                            addSuffix: true,
                        })}
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
            </CardHeader>

            <CardFooter className="justify-between">
                <p className="text-sm text-muted-foreground">
                    {job.totalCount.toLocaleString()} documents
                </p>

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
            </CardFooter>
        </Card>
    );
}
