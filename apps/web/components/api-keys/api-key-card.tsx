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
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

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
            <Card>
                <CardHeader className="flex flex-row items-start justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <AppIcon icon={Key01Icon} />

                            <h3 className="font-semibold">
                                {apiKey.name}
                            </h3>
                        </div>

                        <p className="font-mono text-sm text-muted-foreground">
                            {apiKey.prefix}
                        </p>
                    </div>

                    <Badge
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

                <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            Created
                        </span>

                        <span>{created}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            Last Used
                        </span>

                        <span>{lastUsed}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            Expires
                        </span>

                        <span>{expires}</span>
                    </div>
                </CardContent>

                <CardFooter className="flex gap-2">
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