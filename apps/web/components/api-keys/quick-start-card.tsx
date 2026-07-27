"use client";

import {
    ArrowRight01Icon,
    Copy01Icon,
} from "@hugeicons/core-free-icons";
import { toast } from "sonner";

import { AppIcon } from "@/components/shared/app-icon";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const CURL_EXAMPLE = `curl https://api.certjs.dev/api/v1/jobs \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "templateId=<template-id>" \\
  -F "data=@recipients.csv"`;

export default function QuickStartCard() {
    async function handleCopy() {
        await navigator.clipboard.writeText(CURL_EXAMPLE);

        toast.success("Copied cURL example.");
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Quick Start
                </CardTitle>

                <CardDescription>
                    Authenticate every request using your API key in the{" "}
                    <code>Authorization</code> header.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <p className="text-sm font-medium">
                        Authorization Header
                    </p>

                    <div className="rounded-md border bg-muted px-4 py-3 font-mono text-sm">
                        Authorization: Bearer YOUR_API_KEY
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-sm font-medium">
                        Example Request
                    </p>

                    <pre className="overflow-x-auto rounded-md border bg-muted p-4 text-sm">
                        <code>{CURL_EXAMPLE}</code>
                    </pre>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={handleCopy}
                    >
                        <AppIcon icon={Copy01Icon} />
                        Copy cURL
                    </Button>

                    <Button
                        variant="secondary"
                        asChild
                    >
                        <a href="/docs">
                            View Documentation
                            <AppIcon icon={ArrowRight01Icon} />
                        </a>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}