"use client";

import { useMemo, useState } from "react";

import {
    Delete01Icon,
    Key01Icon,
    ToggleOffIcon,
    ToggleOnIcon,
} from "@hugeicons/core-free-icons";

import DeleteAlertDialog from "@/components/shared/delete-alert-dialog";
import { AppIcon } from "@/components/shared/app-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

import { ListApiKeysResponse } from "@/types/api-keys.types";

type ApiKeyCardProps = {
    apiKey: ListApiKeysResponse[number];

    deleting?: boolean;
    toggling?: boolean;

    onDelete: (apiKey: ListApiKeysResponse[number]) => void;
    onToggleActive: (apiKey: ListApiKeysResponse[number]) => void;
};

export default function ApiKeyCard({
    apiKey,
    deleting = false,
    toggling = false,
    onDelete,
    onToggleActive,
}: ApiKeyCardProps) {
    const [deleteOpen, setDeleteOpen] = useState(false);

    const created = useMemo(
        () =>
            new Intl.DateTimeFormat(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
            }).format(new Date(apiKey.createdAt)),
        [apiKey.createdAt]
    );

    const lastUsed = useMemo(() => {
        if (!apiKey.lastUsedAt) return "Never";

        return new Intl.DateTimeFormat(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(new Date(apiKey.lastUsedAt));
    }, [apiKey.lastUsedAt]);

    const expires = useMemo(() => {
        if (!apiKey.expiresAt) return "Never";

        return new Intl.DateTimeFormat(undefined, {
            dateStyle: "medium",
        }).format(new Date(apiKey.expiresAt));
    }, [apiKey.expiresAt]);

    return (
        <>
            <Card className="overflow-hidden border-border/70 shadow-sm">
                <CardHeader className="flex flex-row items-start justify-between gap-4 px-5 py-5">
                    <div className="min-w-0 space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-muted/40 text-primary">
                                <AppIcon
                                    icon={Key01Icon}
                                    size={18}
                                />
                            </span>

                            <h3 className="truncate font-semibold tracking-tight">
                                {apiKey.name}
                            </h3>
                        </div>

                        <p className="truncate pl-10 font-mono text-xs text-muted-foreground">
                            {apiKey.prefix}
                        </p>
                    </div>

                    <Badge
                        className="shrink-0"
                        variant={
                            apiKey.isActive
                                ? "default"
                                : "secondary"
                        }
                    >
                        {apiKey.isActive
                            ? "Active"
                            : "Inactive"}
                    </Badge>
                </CardHeader>

                <CardContent className="px-5 pb-5">
                    <div className="space-y-3 rounded-lg border bg-muted/20 p-4 text-sm">
                        <div className="grid grid-cols-[88px_minmax(0,1fr)] items-baseline gap-4">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Created
                            </span>

                            <span className="min-w-0 text-right text-foreground">
                                {created}
                            </span>
                        </div>

                        <div className="grid grid-cols-[88px_minmax(0,1fr)] items-baseline gap-4">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Last Used
                            </span>

                            <span className="min-w-0 text-right text-foreground">
                                {lastUsed}
                            </span>
                        </div>

                        <div className="grid grid-cols-[88px_minmax(0,1fr)] items-baseline gap-4">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Expires
                            </span>

                            <span className="min-w-0 text-right text-foreground">
                                {expires}
                            </span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex gap-3 border-t bg-muted/10 px-5 py-4">
                    <Button
                        variant="outline"
                        className="flex-1"
                        disabled={toggling}
                        onClick={() =>
                            onToggleActive(apiKey)
                        }
                    >
                        <AppIcon
                            icon={
                                apiKey.isActive
                                    ? ToggleOffIcon
                                    : ToggleOnIcon
                            }
                        />

                        {apiKey.isActive
                            ? "Deactivate"
                            : "Activate"}
                    </Button>

                    <Button
                        variant="destructive"
                        disabled={deleting}
                        onClick={() =>
                            setDeleteOpen(true)
                        }
                    >
                        <AppIcon icon={Delete01Icon} />
                    </Button>
                </CardFooter>
            </Card>

            <DeleteAlertDialog
                open={deleteOpen}
                deleting={deleting}
                onOpenChange={setDeleteOpen}
                onDelete={() => onDelete(apiKey)}
                title="Delete API Key?"
                description={`"${apiKey.name}" will be permanently deleted. Any applications using this key will immediately lose access to the CertJS API.`}
            />
        </>
    );
}
