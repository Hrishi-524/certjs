"use client";

import { useState } from "react";

import { ArrowDown01Icon } from "@hugeicons/core-free-icons";

import { AppIcon } from "@/components/shared/app-icon";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import QuickStartTabs from "./quick-start-tabs";

export default function QuickStartCard() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <Card className="overflow-hidden border-border/70 shadow-sm">
            <CardHeader
                className={cn(
                    "border-b bg-muted/20 px-5 py-5 sm:px-6",
                    isCollapsed && "border-b-0"
                )}
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                        <CardTitle className="text-xl font-semibold tracking-tight">
                            Quick Start
                        </CardTitle>

                        <CardDescription className="max-w-2xl text-sm leading-6">
                            Get started with the CertJS API using your preferred language.
                        </CardDescription>
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-expanded={!isCollapsed}
                        aria-label={
                            isCollapsed
                                ? "Expand quick start"
                                : "Collapse quick start"
                        }
                        onClick={() =>
                            setIsCollapsed(
                                (collapsed) => !collapsed
                            )
                        }
                    >
                        <AppIcon
                            icon={ArrowDown01Icon}
                            className={cn(
                                "size-4 transition-transform",
                                isCollapsed
                                    ? "-rotate-90"
                                    : "rotate-0"
                            )}
                        />
                    </Button>
                </div>
            </CardHeader>

            {!isCollapsed && (
                <CardContent className="px-5 py-6 sm:px-6 sm:py-7">
                    <QuickStartTabs />
                </CardContent>
            )}
        </Card>
    );
}
