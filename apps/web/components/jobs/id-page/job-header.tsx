"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppIcon } from "@/components/shared/app-icon";
import {
    Alert02Icon,
    Clock01Icon,
    Loading03Icon,
    TaskDone01Icon,
} from "@hugeicons/core-free-icons";
import { GetBatchJobStatusResponse } from "@/types/jobs.types";

type JobHeaderProps = {
    job: GetBatchJobStatusResponse;
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
    GetBatchJobStatusResponse["status"],
    {
        label: string;
        icon: unknown;
    }
>;

function JobHeader({ job }: JobHeaderProps) {
    const status = statusConfig[job.status];

    return (
        <Card>
            <CardHeader className="flex flex-row items-start justify-between">
                <div>
                    <CardTitle>Certificate Batch Job</CardTitle>

                    <CardDescription>
                        Monitor the progress of your certificate generation job.
                    </CardDescription>
                </div>

                <Badge className="gap-2">
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

            <CardContent className="grid gap-6 md:grid-cols-3">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Job ID
                    </p>

                    <p className="font-mono text-sm break-all">
                        {job.meta.jobId}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">
                        Created
                    </p>

                    <p>
                        {new Date(
                            job.meta.createdAt
                        ).toLocaleString()}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">
                        Completed
                    </p>

                    <p>
                        {job.meta.completedAt
                            ? new Date(
                                  job.meta.completedAt
                              ).toLocaleString()
                            : "—"}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

export default JobHeader;