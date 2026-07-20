"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getPlaceholderTypeMeta } from "@/lib/helpers/placeholder-type";
import { GetTemplateResponse } from "@/types/templates.types";
import { ListPlaceholdersResponse } from "@/types/placeholders.types";

type TemplateInfoProps = {
    template: GetTemplateResponse;
    placeholders: ListPlaceholdersResponse;
};

function TemplateInfo({ template, placeholders }: TemplateInfoProps) {
    return (
        <section className="min-w-0 space-y-5">
            <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                    <h1 className="min-w-0 truncate text-2xl font-semibold tracking-normal text-foreground">
                        {template.name}
                    </h1>
                    <Badge variant="secondary">Template</Badge>
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                <Card className="rounded-lg shadow-none">
                    <CardContent className="px-4 py-3">
                        <span className="text-xs font-medium uppercase tracking-normal text-muted-foreground">
                            Dimensions
                        </span>
                        <strong className="mt-1 block text-sm font-semibold text-foreground">
                            {template.width} x {template.height}px
                        </strong>
                    </CardContent>
                </Card>

                <Card className="rounded-lg shadow-none">
                    <CardContent className="px-4 py-3">
                        <span className="text-xs font-medium uppercase tracking-normal text-muted-foreground">
                            Placeholders
                        </span>
                        <strong className="mt-1 block text-sm font-semibold text-foreground">
                            {placeholders.length}
                        </strong>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-3">
                <h2 className="text-sm font-medium text-muted-foreground">
                    Placeholder List
                </h2>

                <div className="overflow-hidden rounded-lg border">
                    {placeholders.length > 0 ? (
                        <ul className="divide-y">
                            {placeholders.map((placeholder, index) => {
                                const meta = getPlaceholderTypeMeta(placeholder.type);

                                return (
                                    <li
                                        key={placeholder.id}
                                        className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 px-3 py-2 sm:grid-cols-[auto_minmax(0,1.25fr)_minmax(120px,0.85fr)_auto] sm:items-center"
                                    >
                                        <span
                                            className={`flex size-6 items-center justify-center rounded-full text-xs font-semibold ${meta.badgeClass}`}
                                        >
                                            {index + 1}
                                        </span>
                                        <strong className="min-w-0 truncate text-sm font-medium text-foreground">
                                            {placeholder.name}
                                        </strong>
                                        <code className="col-start-2 min-w-0 truncate text-xs text-muted-foreground sm:col-start-auto">
                                            {placeholder.key}
                                        </code>
                                        <Badge
                                            className={`col-start-2 w-fit text-xs sm:col-start-auto ${meta.badgeClass}`}
                                        >
                                            {meta.label}
                                        </Badge>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className="px-3 py-4 text-sm text-muted-foreground">
                            No placeholders yet.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default TemplateInfo;
