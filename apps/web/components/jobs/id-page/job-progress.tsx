"use client";

import {
    Alert02Icon,
    Clock01Icon,
    Loading03Icon,
    TaskDone01Icon,
} from "@hugeicons/core-free-icons";

import { AppIcon } from "@/components/shared/app-icon";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { GetBatchJobStatusResponse } from "@/types/jobs.types";

type JobProgressProps = {
    job: GetBatchJobStatusResponse;
};

const statusConfig = {
    pending: {
        title: "Waiting for worker",
        description: "Your batch job is queued and will begin shortly.",
        icon: Clock01Icon,
    },
    processing: {
        title: "Generating certificates",
        description: "Certificates are currently being rendered.",
        icon: Loading03Icon,
    },
    completed: {
        title: "Generation completed",
        description: "All certificates were generated successfully.",
        icon: TaskDone01Icon,
    },
    failed: {
        title: "Generation failed",
        description: "Some certificates could not be generated.",
        icon: Alert02Icon,
    },
} satisfies Record<GetBatchJobStatusResponse["status"], {
    title: string;
    description: string;
    icon: unknown;
}>;

export default function JobProgress({ job }: JobProgressProps) {
    const total = job.meta.totalCount;
    const processed = job.meta.processedCount;

    const progress =
        total === 0 ? 0 : Math.round((processed / total) * 100);

    const remaining = Math.max(total - processed, 0);

    const status = statusConfig[job.status];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Certificate Generation</CardTitle>
                <CardDescription>
                    Track the progress of your certificate batch.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Status */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <AppIcon
                            icon={status.icon}
                            className={
                                job.status === "processing"
                                    ? "animate-spin"
                                    : ""
                            }
                        />

                        <div>
                            <p className="font-medium">
                                {status.title}
                            </p>

                            <p className="text-sm text-muted-foreground">
                                {status.description}
                            </p>
                        </div>
                    </div>

                    <span className="text-2xl font-bold tabular-nums">
                        {progress}%
                    </span>
                </div>

                {/* LeetCode-style counter */}
                <div className="rounded-lg border bg-muted/30 px-4 py-3">
                    <div className="flex items-center gap-3">
                        <AppIcon
                            icon={TaskDone01Icon}
                            className="text-green-600"
                        />

                        <div>
                            <p className="font-semibold tabular-nums">
                                {processed} / {total}
                            </p>

                            <p className="text-sm text-muted-foreground">
                                Certificates generated
                            </p>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <Progress
                    value={progress}
                    className="h-3"
                />

                {/* Footer */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="tabular-nums">
                        {processed} completed
                    </span>

                    <span className="tabular-nums">
                        {remaining} remaining
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}