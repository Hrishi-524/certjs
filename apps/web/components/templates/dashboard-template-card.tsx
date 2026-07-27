"use client";

import { useState } from "react";
import Link from "next/link";

import {
    Delete02Icon,
    Edit02Icon,
    Image01Icon,
    ToggleOffIcon,
    ToggleOnIcon,
} from "@hugeicons/core-free-icons";

import { AppIcon } from "@/components/shared/app-icon";
import DeleteAlertDialog from "@/components/shared/delete-alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Template } from "@/types/templates.types";

type DashboardTemplateCardProps = {
    template: Template;

    deleting?: boolean;
    toggling?: boolean;

    onDelete: (template: Template) => void;
    onToggleActive: (template: Template) => void;
};

function formatRelativeUpdatedTime(updatedAt: string) {
    const updatedTime = new Date(updatedAt).getTime();

    if (Number.isNaN(updatedTime)) {
        return "Updated recently";
    }

    const diffInSeconds = Math.max(
        0,
        Math.floor((Date.now() - updatedTime) / 1000)
    );

    const units = [
        { label: "year", seconds: 60 * 60 * 24 * 365 },
        { label: "month", seconds: 60 * 60 * 24 * 30 },
        { label: "week", seconds: 60 * 60 * 24 * 7 },
        { label: "day", seconds: 60 * 60 * 24 },
        { label: "hour", seconds: 60 * 60 },
        { label: "minute", seconds: 60 },
    ] as const;

    for (const unit of units) {
        const value = Math.floor(diffInSeconds / unit.seconds);

        if (value >= 1) {
            return `Updated ${value} ${unit.label}${value === 1 ? "" : "s"} ago`;
        }
    }

    return "Updated just now";
}

export default function DashboardTemplateCard({
    template,
    deleting = false,
    toggling = false,
    onDelete,
    onToggleActive,
}: DashboardTemplateCardProps) {
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <>
            <Card className="overflow-hidden pt-0 shadow-sm">
                {template.presignedUrl ? (
                    <img
                        src={template.presignedUrl}
                        alt={template.name}
                        className="aspect-video w-full object-cover"
                    />
                ) : (
                    <div className="flex aspect-video items-center justify-center bg-muted text-muted-foreground">
                        <AppIcon
                            icon={Image01Icon}
                            size={40}
                        />
                    </div>
                )}

                <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                        <CardTitle className="line-clamp-2 text-lg">
                            {template.name}
                        </CardTitle>

                        <Badge
                            variant={
                                template.isActive
                                    ? "default"
                                    : "secondary"
                            }
                        >
                            {template.isActive ? "Active" : "Inactive"}
                        </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                            {formatRelativeUpdatedTime(template.updatedAt)}
                        </span>

                        <span>v{template.version}</span>
                    </div>
                </CardHeader>

                <CardContent className="grid grid-cols-2 gap-2">
                    <Button asChild>
                        <Link href={`/dashboard/templates/${template.templateId}`}>
                            <AppIcon icon={Edit02Icon} />
                            Edit
                        </Link>
                    </Button>

                    <Button
                        variant="outline"
                        disabled={toggling}
                        onClick={() => onToggleActive(template)}
                    >
                        <AppIcon
                            icon={
                                template.isActive
                                    ? ToggleOffIcon
                                    : ToggleOnIcon
                            }
                        />

                        {template.isActive ? "Deactivate" : "Activate"}
                    </Button>
                </CardContent>

                <CardFooter>
                    <Button
                        variant="destructive"
                        className="w-full"
                        disabled={deleting}
                        onClick={() => setDeleteOpen(true)}
                    >
                        <AppIcon icon={Delete02Icon} />
                        Delete Template
                    </Button>
                </CardFooter>
            </Card>

            <DeleteAlertDialog
                open={deleteOpen}
                deleting={deleting}
                title="Delete template?"
                description={`"${template.name}" will be permanently deleted along with its placeholders. This action cannot be undone.`}
                onOpenChange={setDeleteOpen}
                onDelete={() => onDelete(template)}
            />
        </>
    );
}