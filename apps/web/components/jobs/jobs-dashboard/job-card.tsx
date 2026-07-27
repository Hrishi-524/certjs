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
        <Card>
            <CardHeader className="flex flex-row items-start justify-between">
                <div>
                    <CardTitle className="text-base">
                        {job.template?.name ?? "Deleted Template"}
                    </CardTitle>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {new Date(
                            job.createdAt
                        ).toLocaleString()}
                    </p>
                </div>

                <Badge
                    variant="secondary"
                    className="gap-2"
                >
                    <AppIcon
                        icon={status.icon}
                        className={
                            job.status === "processing"
                                ? "animate-spin"
                                : ""
                        }
                    />

                    {status.label}
                </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
                <div>
                    <div className="mb-2 flex justify-between text-sm">
                        <span>
                            {job.processedCount} / {job.totalCount}
                        </span>

                        <span>{progress}%</span>
                    </div>

                    <Progress value={progress} />
                </div>

                {job.failedCount > 0 && (
                    <p className="text-sm text-destructive">
                        {job.failedCount} certificate
                        {job.failedCount > 1 ? "s" : ""} failed
                    </p>
                )}
            </CardContent>

            <CardFooter className="justify-end">
                <Button
                    asChild
                    variant="outline"
                    size="sm"
                >
                    <Link href={`/dashboard/jobs/${job.id}`}>
                        View Details

                        <AppIcon icon={ArrowRight01Icon} />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}