"use client";

import Link from "next/link";

import { CERTJS_SDK } from "@/components/data/documentation/overview/certjs-sdk";
import { AppIcon } from "@/components/shared/app-icon";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CertJsSdk() {
    return (
        <section
            id="sdk"
            className="space-y-8"
        >
            <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border bg-muted/40">
                    <AppIcon
                        icon={CERTJS_SDK.icon}
                        className="size-5"
                    />
                </div>

                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        {CERTJS_SDK.title}
                    </h2>

                    <p className="max-w-3xl text-muted-foreground">
                        {CERTJS_SDK.description}
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>NPM Package</CardTitle>

                    <CardDescription>
                        Install the official CertJS SDK.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <code className="rounded-md bg-muted px-3 py-2 text-sm">
                        npm install {CERTJS_SDK.npm}
                    </code>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>
                        {CERTJS_SDK.templateModel.title}
                    </CardTitle>

                    <CardDescription>
                        {CERTJS_SDK.templateModel.description}
                    </CardDescription>
                </CardHeader>
            </Card>

            <Separator />

            <div className="space-y-5">
                <div>
                    <h3 className="text-xl font-semibold">
                        Capabilities
                    </h3>

                    <p className="text-muted-foreground">
                        The SDK focuses on local template management and
                        application-first certificate generation.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {CERTJS_SDK.capabilities.map((capability) => (
                        <Card key={capability.title}>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    {capability.title}
                                </CardTitle>

                                <CardDescription>
                                    {capability.description}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>

            <Separator />

            <Button asChild>
                <Link href={CERTJS_SDK.cta.href}>
                    {CERTJS_SDK.cta.title}

                    <AppIcon
                        icon={CERTJS_SDK.cta.icon}
                        className="size-4"
                    />
                </Link>
            </Button>
        </section>
    );
}