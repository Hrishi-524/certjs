"use client";

import Link from "next/link";

import { CONTRIBUTE } from "@/components/data/landing/contribute";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Contribute() {
    return (
        <section className="mx-auto max-w-5xl px-6 py-20">
            <Card>
                <CardContent className="py-12 text-center">
                    <h2 className="text-3xl font-bold">
                        {CONTRIBUTE.title}
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                        {CONTRIBUTE.description}
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Button asChild>
                            <Link
                                href={CONTRIBUTE.primaryAction.href}
                                target="_blank"
                            >
                                {CONTRIBUTE.primaryAction.label}
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            asChild
                        >
                            <Link
                                href={CONTRIBUTE.secondaryAction.href}
                                target="_blank"
                            >
                                {CONTRIBUTE.secondaryAction.label}
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}