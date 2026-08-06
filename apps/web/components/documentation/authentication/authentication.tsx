"use client";

import Link from "next/link";

import { AUTHENTICATION } from "@/components/data/documentation/authentication/authentication";
import AppCodeBlock from "@/components/shared/app-code-block";
import {AppIcon }from "@/components/shared/app-icon";
import AppLanguageTabs from "@/components/shared/app-language-tabs";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function Authentication() {
    return (
        <section
            id="authentication"
            className="space-y-8"
        >
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <AppIcon
                        icon={AUTHENTICATION.icon}
                        className="size-6"
                    />

                    <h2 className="text-3xl font-semibold tracking-tight">
                        {AUTHENTICATION.title}
                    </h2>
                </div>

                <p className="max-w-3xl text-muted-foreground">
                    {AUTHENTICATION.description}
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Header
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <code className="font-mono text-sm">
                            {AUTHENTICATION.header.name}
                        </code>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Value
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <code className="font-mono text-sm break-all">
                            {AUTHENTICATION.header.value}
                        </code>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Example
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <code className="font-mono text-sm">
                            X-Api-Key: &lt;your-api-key&gt;
                        </code>
                    </CardContent>
                </Card>
            </div>

            <AppCodeBlock
                language="bash"
                label="Authentication Header"
                code={`X-Api-Key: <your-api-key>`}
            />

            <AppLanguageTabs
                snippets={Object.values(AUTHENTICATION.snippets)}
                codeBlockLabel="Authentication Example"
            />

            <Card>
                <CardHeader>
                    <CardTitle>Best Practices</CardTitle>

                    <CardDescription>
                        Follow these recommendations when using API keys.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                        {AUTHENTICATION.notes.map((note) => (
                            <li key={note}>
                                {note}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Button asChild>
                <Link href={AUTHENTICATION.cta.href}>
                    {AUTHENTICATION.cta.title}

                    <AppIcon
                        icon={AUTHENTICATION.cta.icon}
                        className="size-4"
                    />
                </Link>
            </Button>
        </section>
    );
}