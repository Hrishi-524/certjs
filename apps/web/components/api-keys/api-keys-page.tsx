"use client";

import { useState } from "react";

import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { toast } from "sonner";

import ApiKeyCard from "./api-key-card";
import ApiKeyCreatedDialog from "./api-key-created-dialog";
import ApiKeysEmpty from "./api-keys-empty";
import CreateApiKeyDialog from "./create-api-key-dialog";
import QuickStartCard from "./quick-start-card";

import { AppIcon } from "@/components/shared/app-icon";
import { Button } from "@/components/ui/button";

import { useActivateApiKey } from "@/hooks/use-activate-api-key";
import { useApiKeys } from "@/hooks/use-api-keys";
import { useCreateApiKey } from "@/hooks/use-create-api-key";
import { useDeactivateApiKey } from "@/hooks/use-deactivate-api-key";
import { useDeleteApiKey } from "@/hooks/use-delete-api-key";

import {
    CreateApiKeyInput,
    CreateApiKeyResponse,
    ListApiKeysResponse,
} from "@/types/api-keys.types";

export default function ApiKeysPage() {
    const { data: apiKeys = [], isLoading } = useApiKeys();

    const createMutation = useCreateApiKey();
    const deleteMutation = useDeleteApiKey();
    const activateMutation = useActivateApiKey();
    const deactivateMutation = useDeactivateApiKey();

    const [createDialogOpen, setCreateDialogOpen] =
        useState(false);

    const [createdDialogOpen, setCreatedDialogOpen] =
        useState(false);

    const [createdApiKey, setCreatedApiKey] =
        useState<CreateApiKeyResponse | null>(null);

    async function handleCreate(
        input: CreateApiKeyInput
    ) {
        try {
            const response =
                await createMutation.mutateAsync(input);

            setCreatedApiKey(response);

            setCreateDialogOpen(false);

            setCreatedDialogOpen(true);

            toast.success("API key created.");

            return response;
        } catch (error) {
            toast.error("Failed to create API key.");
            throw error;
        }
    }

    async function handleDelete(
        apiKey: ListApiKeysResponse[number]
    ) {
        try {
            await deleteMutation.mutateAsync(apiKey.id);

            toast.success(
                `"${apiKey.name}" deleted successfully.`
            );
        } catch {
            toast.error("Failed to delete API key.");
        }
    }

    async function handleToggle(
        apiKey: ListApiKeysResponse[number]
    ) {
        try {
            if (apiKey.isActive) {
                await deactivateMutation.mutateAsync(
                    apiKey.id
                );

                toast.success(
                    `"${apiKey.name}" deactivated.`
                );
            } else {
                await activateMutation.mutateAsync(
                    apiKey.id
                );

                toast.success(
                    `"${apiKey.name}" activated.`
                );
            }
        } catch {
            toast.error(
                "Failed to update API key."
            );
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
        // Replace with ApiKeyCardSkeleton later.
    }

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            API Keys
                        </h1>

                        <p className="max-w-2xl text-sm text-muted-foreground">
                            Manage API keys for accessing the
                            CertJS API.
                        </p>
                    </div>

                    <Button
                        onClick={() =>
                            setCreateDialogOpen(true)
                        }
                    >
                        <AppIcon icon={PlusSignIcon} />
                        Create API Key
                    </Button>
                </div>

                <QuickStartCard />

                {apiKeys.length === 0 ? (
                    <ApiKeysEmpty
                        onCreate={() =>
                            setCreateDialogOpen(true)
                        }
                    />
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {apiKeys.map((apiKey) => (
                            <ApiKeyCard
                                key={apiKey.id}
                                apiKey={apiKey}
                                deleting={
                                    deleteMutation.isPending
                                }
                                toggling={
                                    activateMutation.isPending ||
                                    deactivateMutation.isPending
                                }
                                onDelete={
                                    handleDelete
                                }
                                onToggleActive={
                                    handleToggle
                                }
                            />
                        ))}
                    </div>
                )}
            </div>

            <CreateApiKeyDialog
                open={createDialogOpen}
                creating={createMutation.isPending}
                onOpenChange={
                    setCreateDialogOpen
                }
                onCreate={handleCreate}
            />

            <ApiKeyCreatedDialog
                open={createdDialogOpen}
                apiKey={
                    createdApiKey?.apikey ?? ""
                }
                onOpenChange={
                    setCreatedDialogOpen
                }
            />
        </>
    );
}
