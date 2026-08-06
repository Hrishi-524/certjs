"use client";

import Link from "next/link";

import {
    ArrowRight01Icon,
    Alert02Icon,
    Clock01Icon,
    Loading03Icon,
    TaskDone01Icon,
} from "@hugeicons/core-free-icons";

import { AppIcon } from "@/components/shared/app-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/shared/table";
import JobsEmptyState from "./jobs-empty-state";

import type { JobSummary } from "@/types/jobs.types";

type AllJobsTableProps = {
    jobs: JobSummary[];
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

export default function AllJobsTable({
    jobs,
}: AllJobsTableProps) {
    if (jobs.length === 0) {
        return (
            <JobsEmptyState
                title="All Jobs"
                description="Every batch job in this workspace."
                emptyTitle="No jobs yet"
                emptyDescription="Created batch jobs will appear in this list."
                icon={Clock01Icon}
            />
        );
    }

    return (
        <section className="space-y-3">
            <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">
                    All Jobs
                </h2>

                <p className="text-sm text-muted-foreground">
                    Every batch job in this workspace.
                </p>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Template</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {jobs.map((job) => {
                        const status = statusConfig[job.status];

                        return (
                            <TableRow key={job.id}>
                                <TableCell className="font-medium">
                                    {job.template?.name ??
                                        "Deleted Template"}
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        variant="secondary"
                                        className="h-6 gap-1.5 rounded-md px-2 text-[11px] font-medium"
                                    >
                                        <AppIcon
                                            icon={status.icon}
                                            size={13}
                                            className={
                                                job.status ===
                                                "processing"
                                                    ? "animate-spin"
                                                    : ""
                                            }
                                        />

                                        {status.label}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    {job.processedCount} /{" "}
                                    {job.totalCount}
                                </TableCell>

                                <TableCell>
                                    {new Date(
                                        job.createdAt
                                    ).toLocaleDateString()}
                                </TableCell>

                                <TableCell className="text-right">
                                    <Button
                                        asChild
                                        size="sm"
                                        variant="outline"
                                        className="h-8 px-3 text-xs"
                                    >
                                        <Link
                                            href={`/dashboard/jobs/${job.id}`}
                                        >
                                            View

                                            <AppIcon
                                                icon={
                                                    ArrowRight01Icon
                                                }
                                                size={14}
                                            />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </section>
    );
}
