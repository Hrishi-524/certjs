"use client";

import Link from "next/link";

import {
    Alert02Icon,
    ArrowRight01Icon,
    Clock01Icon,
    Loading03Icon,
    TaskDone01Icon,
} from "@hugeicons/core-free-icons";

import { AppIcon } from "@/components/shared/app-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import type { JobSummary } from "@/types/jobs.types";

type JobCardProps = {
    job: JobSummary;
};

const statusConfig = {
    pending: {
        label: "Pending",
        icon: Clock01Icon,
    },
    processing: {
        label: "Processing",
        icon: Loading03Icon,
    },
    completed: {
        label: "Completed",
        icon: TaskDone01Icon,
    },
    failed: {
        label: "Failed",
        icon: Alert02Icon,
    },
} satisfies Record<
    JobSummary["status"],
    {
        label: string;
        icon: unknown;
    }
>;

export default function JobCard({
    job,
}: JobCardProps) {
    const status = statusConfig[job.status];

    const progress =
        job.totalCount === 0
            ? 0
            : Math.round(
                  (job.processedCount / job.totalCount) * 100
              );

    return (
        <Card size="sm" className="shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between gap-3 pb-3">
                <div className="min-w-0 space-y-1.5">
                    <CardTitle className="line-clamp-1 text-sm font-semibold leading-5">
                        {job.template?.name ?? "Deleted Template"}
                    </CardTitle>

                    <p className="text-xs leading-none text-muted-foreground">
                        {new Date(
                            job.createdAt
                        ).toLocaleString()}
                    </p>
                </div>

                <Badge
                    variant="secondary"
                    className="h-6 shrink-0 gap-1.5 rounded-md px-2 text-[11px] font-medium"
                >
                    <AppIcon
                        icon={status.icon}
                        size={13}
                        className={
                            job.status === "processing"
                                ? "animate-spin"
                                : ""
                        }
                    />

                    {status.label}
                </Badge>
            </CardHeader>

            <CardContent className="space-y-2.5 pb-3">
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">
                            {job.processedCount} / {job.totalCount}
                        </span>

                        <span>{progress}%</span>
                    </div>

                    <Progress value={progress} />
                </div>

                {job.failedCount > 0 && (
                    <p className="text-xs font-medium text-destructive">
                        {job.failedCount} certificate
                        {job.failedCount > 1 ? "s" : ""} failed
                    </p>
                )}
            </CardContent>

            <CardFooter className="justify-end pt-0">
                <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="-mr-2 h-7 px-2 text-xs"
                >
                    <Link href={`/dashboard/jobs/${job.id}`}>
                        View

                        <AppIcon
                            icon={ArrowRight01Icon}
                            size={14}
                        />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
