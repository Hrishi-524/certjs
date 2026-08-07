"use client";

import Link from "next/link";

import { PRIMARY_ACTIONS } from "@/components/data/landing/primary-actions";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/shared/app-icon";

export default function PrimaryActions() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-20">
            <div className="grid gap-6 md:grid-cols-3">
                {PRIMARY_ACTIONS.map((action) => (
                    <Card
                        key={action.title}
                        className="transition-all hover:shadow-md"
                    >
                        <CardContent className="flex h-full flex-col p-6">
                            <div className="mb-5">
                                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-muted">
                                    <AppIcon
                                        icon={action.icon}
                                        className="size-6"
                                    />
                                </div>

                                <h3 className="text-xl font-semibold">
                                    {action.title}
                                </h3>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    {action.description}
                                </p>
                            </div>

                            <div className="mt-auto">
                                <Button
                                    asChild
                                    className="w-full"
                                >
                                    <Link href={action.href}>
                                        Open
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}