"use client";

import Link from "next/link";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

import { CERTJS_API } from "@/components/data/documentation/overview/certjs-api";
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

export default function CertJsApi() {
    return (
        <section
            id="api"
            className="space-y-8"
        >
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border bg-muted/40">
                        <AppIcon
                            icon={CERTJS_API.icon}
                            className="size-5"
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            {CERTJS_API.title}
                        </h2>

                        <p className="text-muted-foreground">
                            {CERTJS_API.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Base URL
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <code className="text-sm break-all">
                            {CERTJS_API.baseUrl}
                        </code>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Authentication
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <code className="text-sm">
                            {CERTJS_API.authentication.header}
                        </code>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Content Type
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <code className="text-sm">
                            {CERTJS_API.authentication.contentType}
                        </code>
                    </CardContent>
                </Card>
            </div>

            <Separator />

            <div className="space-y-5">
                <div>
                    <h3 className="text-xl font-semibold">
                        Capabilities
                    </h3>

                    <p className="text-muted-foreground">
                        The REST API provides the following capabilities.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {CERTJS_API.capabilities.map((capability) => (
                        <Card key={capability.title}>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    {capability.title}
                                </CardTitle>

                                <CardDescription>
                                    {capability.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <Button
                                    asChild
                                    variant="link"
                                    className="px-0"
                                >
                                    <Link href={capability.href}>
                                        Learn More

                                        <AppIcon
                                            icon={ArrowRight01Icon}
                                            className="size-4"
                                        />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <Separator />

            <Button asChild>
                <Link href={CERTJS_API.cta.href}>
                    {CERTJS_API.cta.title}

                    <AppIcon
                        icon={CERTJS_API.cta.icon}
                        className="size-4"
                    />
                </Link>
            </Button>
        </section>
    );
}