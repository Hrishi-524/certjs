"use client";

import Link from "next/link";

import { Separator } from "@/components/ui/separator";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t bg-background">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10">
                <div className="grid gap-8 md:grid-cols-4">
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">
                            CertJS
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            Developer-first certificate generation platform.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold">
                            Product
                        </h4>

                        <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <Link
                                href="/docs"
                                className="hover:text-foreground"
                            >
                                Documentation
                            </Link>

                            <Link
                                href="/dashboard"
                                className="hover:text-foreground"
                            >
                                Dashboard
                            </Link>

                            <Link
                                href="/get-config"
                                className="hover:text-foreground"
                            >
                                Get Config
                            </Link>

                            <Link
                                href="/sdk"
                                className="hover:text-foreground"
                            >
                                SDK
                            </Link>
                        </nav>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold">
                            Resources
                        </h4>

                        <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <Link
                                href="/architecture"
                                className="hover:text-foreground"
                            >
                                Architecture
                            </Link>

                            <Link
                                href="https://github.com/Hrishi-524/certjs"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-foreground"
                            >
                                GitHub
                            </Link>

                            <Link
                                href="https://github.com/Hrishi-524/certjs"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-foreground"
                            >
                                Contribute
                            </Link>
                        </nav>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold">
                            Legal
                        </h4>

                        <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <Link
                                href="/privacy"
                                className="hover:text-foreground"
                            >
                                Privacy
                            </Link>

                            <Link
                                href="/license"
                                className="hover:text-foreground"
                            >
                                License
                            </Link>
                        </nav>
                    </div>
                </div>

                <Separator />

                <div className="flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                    <p>
                        © {year} CertJS. All rights reserved.
                    </p>

                    <p>
                        Built for developers.
                    </p>
                </div>
            </div>
        </footer>
    );
}