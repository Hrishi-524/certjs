"use client";

import { FEATURES } from "@/components/data/landing/features";

import { Card, CardContent } from "@/components/ui/card";
import { AppIcon } from "@/components/shared/app-icon";

export default function FeatureGrid() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-20">
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold">
                    Features
                </h2>

                <p className="mt-3 text-muted-foreground">
                    Everything required to build automated certificate workflows.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {FEATURES.map((feature) => (
                    <Card key={feature.title}>
                        <CardContent className="p-6">
                            <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-muted">
                                <AppIcon
                                    icon={feature.icon}
                                />
                            </div>

                            <h3 className="font-semibold">
                                {feature.title}
                            </h3>

                            <p className="mt-2 text-sm text-muted-foreground">
                                {feature.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}