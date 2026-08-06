"use client";

import { AppIcon } from "@/components/shared/app-icon";
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card";

type JobsEmptyStateProps = {
    title: string;
    description: string;
    emptyTitle: string;
    emptyDescription: string;
    icon: React.ComponentProps<typeof AppIcon>["icon"];
};

export default function JobsEmptyState({
    title,
    description,
    emptyTitle,
    emptyDescription,
    icon,
}: JobsEmptyStateProps) {
    return (
        <section className="space-y-3">
            <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">
                    {title}
                </h2>

                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            </div>

            <Card className="border-dashed bg-muted/20">
                <CardContent className="flex items-center gap-3 px-4 py-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-background">
                        <AppIcon
                            icon={icon}
                            size={20}
                        />
                    </div>

                    <div className="min-w-0 space-y-1">
                        <CardTitle className="text-sm">
                            {emptyTitle}
                        </CardTitle>

                        <p className="text-sm text-muted-foreground">
                            {emptyDescription}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
