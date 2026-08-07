"use client";

import Link from "next/link";

import {
    ArrowRight01Icon,
    GithubIcon,
    Rocket01Icon,
} from "@hugeicons/core-free-icons";

import { AppIcon } from "@/components/shared/app-icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
    return (
        <section className="space-y-8">
            <div className="space-y-4">
                <Badge
                    variant="secondary"
                    className="w-fit rounded-full px-3 py-1"
                >
                    Coming Soon
                </Badge>

                <div className="space-y-3">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Get <span className="font-mono">certjs.config.json</span>
                    </h1>

                    <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                        Export a portable configuration file for the CertJS
                        JavaScript SDK and generate certificates entirely on
                        your own infrastructure. This workflow extends the
                        existing editor with a local, privacy-first developer
                        experience.
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                    <Link href="/docs#sdk">
                        <AppIcon icon={Rocket01Icon} />
                        SDK Documentation
                    </Link>
                </Button>

                <Button
                    asChild
                    variant="outline"
                    size="lg"
                >
                    <a
                        href="https://github.com/your-org/certjs"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <AppIcon icon={GithubIcon} />
                        GitHub
                    </a>
                </Button>
            </div>

            <div className="rounded-xl border bg-muted/30 p-5">
                <div className="flex items-start gap-3">
                    <AppIcon
                        icon={ArrowRight01Icon}
                        className="mt-0.5 text-primary"
                    />

                    <div className="space-y-1">
                        <h2 className="font-semibold">
                            Dashboard Editor → Local SDK
                        </h2>

                        <p className="text-sm leading-6 text-muted-foreground">
                            The visual template editor is already available in
                            the CertJS dashboard. This upcoming workflow focuses
                            on exporting a portable{" "}
                            <code className="rounded bg-muted px-1 py-0.5 text-xs">
                                certjs.config.json
                            </code>{" "}
                            file so templates can be generated locally without
                            storing them in your CertJS workspace.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}