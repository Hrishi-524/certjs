"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import QuickStartTabs from "./quick-start-tabs";

export default function QuickStartCard() {
    return (
        <Card className="overflow-hidden border-border/70 shadow-sm">
            <CardHeader className="space-y-2 border-b bg-muted/20 px-5 py-5 sm:px-6">
                <CardTitle className="text-xl font-semibold tracking-tight">
                    Quick Start
                </CardTitle>

                <CardDescription className="max-w-2xl text-sm leading-6">
                    Get started with the CertJS API using your preferred language.
                </CardDescription>
            </CardHeader>

            <CardContent className="px-5 py-6 sm:px-6 sm:py-7">
                <QuickStartTabs />
            </CardContent>
        </Card>
    );
}
