"use client";

import Link from "next/link";

import {
    ArrowRight01Icon,
    BookOpen01Icon,
    Certificate01Icon,
    Rocket01Icon,
} from "@hugeicons/core-free-icons";

import { AppIcon } from "@/components/shared/app-icon";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function WorkspaceOnboarding() {
    return (
        <section>
            <Card className="border-primary/20 bg-primary/[0.04]">
                <CardHeader className="grid gap-5 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                        <AppIcon
                            icon={Rocket01Icon}
                            size={24}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <CardTitle className="text-2xl">
                            Welcome to CertJS
                        </CardTitle>

                        <CardDescription className="max-w-2xl">
                            Upload a template, add recipient data, and generate
                            your first certificate batch in minutes.
                        </CardDescription>
                    </div>

                    <CardContent className="flex flex-col gap-2 p-0 sm:flex-row sm:justify-end">
                        <Button asChild>
                            <Link href="/dashboard/templates/new">
                                <AppIcon icon={Certificate01Icon} />

                                Upload Template

                                <AppIcon icon={ArrowRight01Icon} />
                            </Link>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                        >
                            <Link href="/docs">
                                <AppIcon icon={BookOpen01Icon} />

                                Docs
                            </Link>
                        </Button>
                    </CardContent>
                </CardHeader>
            </Card>
        </section>
    );
}
