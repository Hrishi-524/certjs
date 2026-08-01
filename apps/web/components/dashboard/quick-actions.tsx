"use client";

import Link from "next/link";

import {
    ApiIcon,
    BookOpen01Icon,
    Certificate01Icon,
    Upload01Icon,
} from "@hugeicons/core-free-icons";

import { AppIcon } from "@/components/shared/app-icon";
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const actions = [
    {
        title: "Upload Template",
        description: "Create a new certificate template.",
        href: "/dashboard/templates/new",
        icon: Upload01Icon,
    },
    {
        title: "Generate Certificates",
        description: "Upload recipient data and generate documents.",
        href: "/dashboard/playground",
        icon: Certificate01Icon,
    },
    {
        title: "Manage API Keys",
        description: "Create and manage API credentials.",
        href: "/dashboard/api-keys",
        icon: ApiIcon,
    },
    {
        title: "Documentation",
        description: "Learn how to integrate CertJS.",
        href: "/docs",
        icon: BookOpen01Icon,
    },
];

export default function QuickActions() {
    return (
        <section className="space-y-4">
            <div className="space-y-1">
                <h2 className="text-lg font-semibold tracking-tight">
                    Quick Actions
                </h2>

                <p className="text-sm text-muted-foreground">
                    Jump directly into the most common workflows.
                </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                {actions.map((action) => (
                    <Link
                        key={action.title}
                        href={action.href}
                    >
                        <Card
                            size="sm"
                            className="h-full transition-colors hover:border-primary/60 hover:bg-muted/20"
                        >
                            <CardHeader className="flex flex-row items-center gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
                                    <AppIcon
                                        icon={action.icon}
                                        size={18}
                                    />
                                </div>

                                <div className="min-w-0">
                                    <CardTitle className="text-base">
                                        {action.title}
                                    </CardTitle>

                                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                                        {action.description}
                                    </p>
                                </div>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    );
}
