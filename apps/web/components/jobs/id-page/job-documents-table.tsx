"use client";

import { useMemo } from "react";

import {
    Alert02Icon,
    Clock01Icon,
    Download04Icon,
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./table";
import { Document } from "@/types/documents.types";
import { ListBatchJobDocumentsResponse } from "@/types/jobs.types";

type JobDocumentsTableProps = {
    count: number;
    documents: Document[];
} 

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
    Document["status"],
    {
        label: string;
        icon: unknown;
    }
>;

export default function JobDocumentsTable({
    documents,
}: JobDocumentsTableProps) {
    if (documents.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Generated Documents</CardTitle>

                    <CardDescription>
                        Documents will appear here once processing begins.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Generated Documents</CardTitle>

                <CardDescription>
                    Review the status of every generated certificate.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Recipient</TableHead>

                            <TableHead>Status</TableHead>

                            <TableHead>Created</TableHead>

                            <TableHead className="text-right">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {documents.map((document, index) => {
                            const status =
                                statusConfig[document.status];

                            const values = Object.values(document.recipientData);

                            const recipient =
                                values.length > 0
                                    ? String(values[0])
                                    : `Recipient #${index + 1}`;

                            return (
                                <TableRow key={document.id}>
                                    <TableCell className="font-medium">
                                        {recipient}
                                    </TableCell>

                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className="gap-2"
                                        >
                                            <AppIcon
                                                icon={status.icon}
                                                className={
                                                    document.status ===
                                                    "processing"
                                                        ? "animate-spin"
                                                        : ""
                                                }
                                            />

                                            {status.label}
                                        </Badge>
                                    </TableCell>

                                    <TableCell>
                                        {new Date(
                                            document.createdAt
                                        ).toLocaleString()}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        {document.status ===
                                            "completed" &&
                                        document.s3Url ? (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <a
                                                    href={
                                                        document.s3Url
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <AppIcon
                                                        icon={
                                                            Download04Icon
                                                        }
                                                    />

                                                    Download
                                                </a>
                                            </Button>
                                        ) : document.status ===
                                          "failed" ? (
                                            <span className="text-sm text-destructive">
                                                Failed
                                            </span>
                                        ) : (
                                            <span className="text-sm text-muted-foreground">
                                                —
                                            </span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}