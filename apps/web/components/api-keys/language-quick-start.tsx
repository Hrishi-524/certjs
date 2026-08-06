"use client";

import Link from "next/link";

import {
    ArrowRight01Icon,
    InformationCircleIcon,
} from "@hugeicons/core-free-icons";

import AppCodeBlock from "@/components/shared/app-code-block";
import { AppIcon } from "@/components/shared/app-icon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { BundledLanguage } from "@/components/ui/code-block";

type LanguageQuickStartProps = {
    language: BundledLanguage;

    snippet: {
        env: string;
        snippet: string;
    };
};

const JOB_RESPONSE = `{
  "jobId": "...",
  "status": "pending",
  "totalCount": 500,
  "processedCount": 0
}`;

export default function LanguageQuickStart({
    language,
    snippet,
}: LanguageQuickStartProps) {
    return (
        <div className="space-y-8">
            <AppCodeBlock
                language="bash"
                label="Set API Key"
                code={snippet.env}
            />

            <AppCodeBlock
                language={language}
                label="Create Job"
                code={snippet.snippet}
            />

            <AppCodeBlock
                language="json"
                label="Response (201 Created)"
                code={JOB_RESPONSE}
            />

            <Alert className="border-border/70 bg-muted/20 px-5 py-4">
                <AppIcon
                    icon={InformationCircleIcon}
                    className="mt-0.5 text-primary"
                />

                <AlertTitle className="text-base font-semibold tracking-tight">
                    Next Steps
                </AlertTitle>

                <AlertDescription className="space-y-4 pt-1 text-sm leading-6">
                    <p className="text-muted-foreground">
                        Poll{" "}
                        <span className="rounded-md border bg-background px-1.5 py-0.5 font-mono text-xs text-foreground">
                            job status
                        </span>{" "}
                        or provide a webhook URL to receive completion
                        notifications automatically.
                    </p>

                    <Link
                        href="/docs"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                        View Documentation
                        <AppIcon
                            icon={ArrowRight01Icon}
                            size={16}
                        />
                    </Link>
                </AlertDescription>
            </Alert>
        </div>
    );
}
