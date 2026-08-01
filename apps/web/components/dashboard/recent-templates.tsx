"use client";

import Link from "next/link";

import RecentTemplateCard from "./recent-template-card";

import { Button } from "@/components/ui/button";

import { DashboardRecentTemplate } from "@/types/dashboard.types";

type RecentTemplatesProps = {
    templates: DashboardRecentTemplate[];
};

export default function RecentTemplates({
    templates,
}: RecentTemplatesProps) {
    if (templates.length === 0) {
        return null;
    }

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-lg font-semibold tracking-tight">
                        Recent Templates
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Continue working with your latest certificate templates.
                    </p>
                </div>

                <Button
                    asChild
                    variant="ghost"
                    size="sm"
                >
                    <Link href="/dashboard/templates">
                        View all
                    </Link>
                </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {templates.map((template) => (
                    <RecentTemplateCard
                        key={template.id}
                        template={template}
                    />
                ))}
            </div>
        </section>
    );
}
