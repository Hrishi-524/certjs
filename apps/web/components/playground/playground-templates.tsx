"use client"

import { useTemplates } from '@/hooks/use-templates';
import React, { useMemo, useState } from 'react'
import TemplateCard from './template-card';
import SearchTemplates from './search-templates';
import { FileSearchIcon, InboxIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Skeleton } from '@/components/ui/skeleton';

function TemplateCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="p-5 pt-0">
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
    </div>
  )
}

function PlaygroundTemplates() {
    const [searchQuery, setSearchQuery] = useState("");

    const { data: templates, isLoading } = useTemplates();
    
    const query = searchQuery.trim().toLowerCase();

    const filteredTemplates = useMemo(() => {
        if (!templates) return [];

        if (!query) return templates;

        return templates.filter((template) =>
            template.name.toLowerCase().includes(query)
        );
    }, [templates, query]);

    const hasTemplates = Boolean(templates?.length);
    
    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
            <div className="space-y-6 text-center">
                <div className="space-y-2">
                    <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                        Playground
                    </h1>
                    <p className="text-sm text-muted-foreground sm:text-base">
                        Start by selecting a template to generate certificates.
                    </p>
                </div>
                <SearchTemplates value={searchQuery} onChange={setSearchQuery} />
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
                        <TemplateCard key={template.templateId} template={template} />
                    ))}
                </div>
            ) : (
                <div className="mx-auto flex min-h-64 w-full max-w-md flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 py-12 text-center">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-background text-muted-foreground shadow-sm ring-1 ring-border">
                        <HugeiconsIcon
                            icon={hasTemplates ? FileSearchIcon : InboxIcon}
                            strokeWidth={1.75}
                            className="size-6"
                        />
                    </div>
                    <h2 className="text-base font-semibold">
                        {hasTemplates ? "No templates match your search." : "No templates found"}
                    </h2>
                    {!hasTemplates ? (
                        <p className="mt-2 text-sm text-muted-foreground">
                            Templates you create will appear here when they are ready to test.
                        </p>
                    ) : null}
                </div>
            )}
        </div>
    )
}

export default PlaygroundTemplates
