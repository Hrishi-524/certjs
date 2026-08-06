
"use client";

import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

import type { Greeting } from "@/components/data/dashboard/greetings";
import {
    getGreeting,
} from "@/components/data/dashboard/greetings";

type DashboardHeaderProps = {
    name?: string;
};

function personalizeTitle(title: string, name?: string) {
    if (!name) {
        return title;
    }

    if (title.endsWith("?")) {
        return `${title.slice(0, -1)}, ${name}?`;
    }

    if (title.endsWith(".")) {
        return `${title.slice(0, -1)}, ${name}.`;
    }

    return `${title}, ${name}`;
}

export default function DashboardHeader({
    name,
}: DashboardHeaderProps) {
    const [greeting, setGreeting] = useState<Greeting | null>(null);
    const [showSubtitle, setShowSubtitle] = useState(false);

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            setGreeting(getGreeting());
        }, 0);

        return () => window.clearTimeout(timeout);
    }, []);

    if (!greeting) {
        return (
            <section className="space-y-2">
                <div className="h-9 w-80 max-w-full animate-pulse rounded-md bg-muted" />
                <div className="h-5 w-[32rem] max-w-full animate-pulse rounded-md bg-muted" />
            </section>
        );
    }

    const title = personalizeTitle(greeting.title, name);

    return (
        <section className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
                <TypeAnimation
                    sequence={[
                        title,
                        () => setShowSubtitle(true),
                    ]}
                    speed={68}
                    cursor={!showSubtitle}
                    repeat={0}
                />
            </h1>

            <p
                className={
                    "max-w-2xl text-muted-foreground transition-opacity duration-500 " +
                    (showSubtitle ? "opacity-100" : "opacity-0")
                }
            >
                {greeting.subtitle}
            </p>
        </section>
    );
}
