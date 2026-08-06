"use client";

import Link from "next/link";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

import { GETTING_STARTED } from "@/components/data/documentation/overview/getting-started";
import { AppIcon } from "@/components/shared/app-icon";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function GettingStarted() {
    return (
        <section
            id="getting-started"
            className="space-y-6"
        >
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                    {GETTING_STARTED.title}
                </h2>

                <p className="max-w-3xl text-muted-foreground">
                    {GETTING_STARTED.description}
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {GETTING_STARTED.integrations.map((integration) => (
                    <Card key={integration.id}>
                        <CardHeader className="space-y-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-lg border bg-muted/40">
                                <AppIcon
                                    icon={integration.icon}
                                    className="size-5"
                                />
                            </div>

                            <div className="space-y-2">
                                <CardTitle>
                                    {integration.title}
                                </CardTitle>

                                <CardDescription>
                                    {integration.description}
                                </CardDescription>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <ol className="space-y-3">
                                {integration.steps.map((step, index) => (
                                    <li
                                        key={step}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium">
                                            {index + 1}
                                        </div>

                                        <span className="text-sm text-muted-foreground">
                                            {step}
                                        </span>
                                    </li>
                                ))}
                            </ol>

                            <Button
                                asChild
                                variant="link"
                                className="px-0"
                            >
                                <Link href={integration.cta.href}>
                                    {integration.cta.label}

                                    <AppIcon
                                        icon={ArrowRight01Icon}
                                        className="size-4"
                                    />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}