"use client";

import { useMemo, useState } from "react";

import {
    FileSearchIcon,
    InboxIcon,
} from "@hugeicons/core-free-icons";

import DashboardTemplateCard from "./dashboard-template-card";
import SearchTemplates from "./search-templates";

import { AppIcon } from "@/components/shared/app-icon";
import { TemplateCardSkeleton } from "@/components/skeletons/templates-skeleton";

import { useTemplates } from "@/hooks/use-templates";
import { useDeleteTemplate } from "@/hooks/use-delete-template";
import { useActivateTemplate } from "@/hooks/use-activate-template";
import { useDeactivateTemplate } from "@/hooks/use-deactivate-template";

import { Template } from "@/types/templates.types";

export default function DashboardTemplates() {
    const [searchQuery, setSearchQuery] = useState("");

    const { data: templates, isLoading } = useTemplates();

    const deleteMutation = useDeleteTemplate();
    const activateMutation = useActivateTemplate();
    const deactivateMutation = useDeactivateTemplate();

    const query = searchQuery.trim().toLowerCase();

    const filteredTemplates = useMemo(() => {
        if (!templates) return [];

        if (!query) return templates;

        return templates.filter((template) =>
            template.name.toLowerCase().includes(query)
        );
    }, [templates, query]);

    const hasTemplates = Boolean(templates?.length);

    async function handleDelete(template: Template) {
        await deleteMutation.mutateAsync(template.templateId);
    }

    async function handleToggleActive(template: Template) {
        if (template.isActive) {
            await deactivateMutation.mutateAsync(template.templateId);
        } else {
            await activateMutation.mutateAsync(template.templateId);
        }
    }

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
            <div className="space-y-6 text-center">
                <div className="space-y-2">
                    <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                        Your Templates
                    </h1>

                    <p className="text-sm text-muted-foreground sm:text-base">
                        Manage, activate, and organize your certificate templates.
                    </p>
                </div>

                <SearchTemplates
                    value={searchQuery}
                    onChange={setSearchQuery}
                />
            </div>

            {isLoading ? (
                <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <TemplateCardSkeleton key={index} />
                    ))}
                </div>
            ) : filteredTemplates.length > 0 ? (
                <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {filteredTemplates.map((template) => (
                        <DashboardTemplateCard
                            key={template.templateId}
                            template={template}
                            deleting={deleteMutation.isPending}
                            toggling={
                                activateMutation.isPending ||
                                deactivateMutation.isPending
                            }
                            onDelete={handleDelete}
                            onToggleActive={handleToggleActive}
                        />
                    ))}
                </div>
            ) : (
                <div className="mx-auto flex min-h-64 w-full max-w-md flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 py-12 text-center">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-background text-muted-foreground shadow-sm ring-1 ring-border">
                        <AppIcon
                            icon={hasTemplates ? FileSearchIcon : InboxIcon}
                        />
                    </div>

                    <h2 className="text-base font-semibold">
                        {hasTemplates
                            ? "No templates match your search."
                            : "No templates found"}
                    </h2>

                    {!hasTemplates && (
                        <p className="mt-2 text-sm text-muted-foreground">
                            Upload your first template to start generating certificates.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
