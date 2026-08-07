"use client";

import Link from "next/link";
import Image from "next/image";

import { ARCHITECTURE } from "@/components/data/landing/architecture";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ArchitecturePreview() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-20">
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold">
                    {ARCHITECTURE.title}
                </h2>

                <p className="mt-3 text-muted-foreground">
                    {ARCHITECTURE.description}
                </p>
            </div>

            <Card>
                <CardContent className="space-y-8 p-8">
                    <Image
                        src={ARCHITECTURE.image}
                        alt="Architecture"
                        width={1400}
                        height={800}
                        className="w-full rounded-xl border"
                    />

                    <div className="flex justify-center">
                        <Button asChild>
                            <Link
                                href={ARCHITECTURE.github}
                                target="_blank"
                            >
                                {ARCHITECTURE.action}
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}