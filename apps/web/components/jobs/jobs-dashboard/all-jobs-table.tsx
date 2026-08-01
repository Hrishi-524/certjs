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
    return (
        <section className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">
                All Jobs
            </h2>

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
                                        className="gap-2"
                                    >
                                        <AppIcon
                                            icon={status.icon}
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
                                    >
                                        <Link
                                            href={`/dashboard/jobs/${job.id}`}
                                        >
                                            View

                                            <AppIcon
                                                icon={
                                                    ArrowRight01Icon
                                                }
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
