"use client";

import Link from "next/link";

import {
    ArrowRight01Icon,
    Certificate01Icon,
} from "@hugeicons/core-free-icons";

import { AppIcon } from "@/components/shared/app-icon";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card";

export default function RecentJobsEmpty() {
    return (
        <section className="space-y-4">
            <div className="space-y-1">
                <h2 className="text-lg font-semibold tracking-tight">
                    Recent Jobs
                </h2>

                <p className="text-sm text-muted-foreground">
                    Your completed certificate batches will appear here.
                </p>
            </div>

            <Card className="border-dashed bg-muted/20">
                <CardContent className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border bg-background">
                        <AppIcon
                            icon={Certificate01Icon}
                            size={22}
                        />
                    </div>

                    <div className="space-y-1">
                        <CardTitle>No jobs yet</CardTitle>

                        <p className="max-w-md text-sm text-muted-foreground">
                            Generate a batch and completed jobs will appear here.
                        </p>
                    </div>

                    <Button
                        asChild
                        size="sm"
                    >
                        <Link href="/dashboard/playground">
                            Generate Certificates

                            <AppIcon icon={ArrowRight01Icon} />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </section>
    );
}
