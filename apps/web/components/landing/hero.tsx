"use client";

import Link from "next/link";

import { HERO } from "@/components/data/landing/hero";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="border-b">
            <div className="mx-auto flex min-h-[32rem] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
                <Badge
                    variant="secondary"
                    className="mb-6 rounded-full px-4 py-1"
                >
                    {HERO.badge}
                </Badge>

                <h1 className="max-w-5xl text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                    {HERO.title}
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground text-pretty">
                    {HERO.description}
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    {HERO.actions.map((action, index) => (
                        <Button
                            key={action.label}
                            asChild
                            size="lg"
                            variant={
                                index === 0
                                    ? "default"
                                    : "outline"
                            }
                        >
                            <Link href={action.href}>
                                {action.label}
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    );
}