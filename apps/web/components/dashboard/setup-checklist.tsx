"use client";

import Link from "next/link";

import {
    ArrowRight01Icon,
    BookOpen01Icon,
    CheckmarkCircle02Icon,
    CircleIcon,
} from "@hugeicons/core-free-icons";

import { AppIcon } from "@/components/shared/app-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { DashboardSetup } from "@/types/dashboard.types";

type SetupChecklistProps = {
    setup: DashboardSetup;
};

export default function SetupChecklist({
    setup,
}: SetupChecklistProps) {
    const steps = [
        {
            label: "Upload a template",
            completed: setup.hasTemplate,
            href: "/dashboard/templates/new",
        },
        {
            label: "Create an API key",
            completed: setup.hasApiKey,
            href: "/dashboard/api-keys",
        },
        {
            label: "Generate your first batch",
            completed: setup.hasGeneratedBatch,
            href: "/dashboard/playground",
        },
    ];

    const completedSteps = steps.filter(step => step.completed).length;
    const progress = (completedSteps / steps.length) * 100;
    const isComplete = completedSteps === steps.length;

    if (isComplete) {
        return (
            <Card className="h-full border-primary/20 bg-primary/[0.03] shadow-sm">
                <CardHeader className="space-y-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                        <AppIcon
                            icon={CheckmarkCircle02Icon}
                            size={24}
                        />
                    </div>

                    <div className="space-y-1">
                        <CardTitle>You&apos;re all set</CardTitle>

                        <p className="text-sm text-muted-foreground">
                            Your workspace is fully configured.
                        </p>
                    </div>
                </CardHeader>

                <CardContent className="space-y-5">
                    <p className="text-sm leading-6 text-muted-foreground">
                        You can now focus on creating templates, generating
                        certificates, and integrating CertJS.
                    </p>

                    <Button
                        asChild
                        variant="outline"
                        className="w-full justify-between"
                    >
                        <Link href="/docs">
                            <span className="inline-flex items-center gap-2">
                                <AppIcon
                                    icon={BookOpen01Icon}
                                    size={16}
                                />
                                View Documentation
                            </span>

                            <AppIcon
                                icon={ArrowRight01Icon}
                                size={16}
                            />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="h-full shadow-sm">
            <CardHeader className="space-y-2">
                <CardTitle>Getting Started</CardTitle>

                <p className="text-sm text-muted-foreground">
                    Complete these steps to start generating certificates.
                </p>

                <Progress value={progress} />
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="space-y-3">
                    {steps.map(step => (
                        <Link
                            key={step.label}
                            href={step.href}
                            className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-muted/50"
                        >
                            <AppIcon
                                icon={
                                    step.completed
                                        ? CheckmarkCircle02Icon
                                        : CircleIcon
                                }
                            />

                            <span
                                className={
                                    step.completed
                                        ? "text-muted-foreground line-through"
                                        : ""
                                }
                            >
                                {step.label}
                            </span>
                        </Link>
                    ))}
                </div>

                <p className="text-sm text-muted-foreground">
                    {completedSteps} of {steps.length} completed
                </p>
            </CardContent>
        </Card>
    );
}
