"use client";

import type { ReactNode } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type ComparisonSide = {
    title: string;
    description?: string;
    children: ReactNode;
    footer?: ReactNode;
};

type ComparisonCardProps = {
    left: ComparisonSide;
    right: ComparisonSide;
};

export default function ComparisonCard({
    left,
    right,
}: ComparisonCardProps) {
    return (
        <Card>
            <CardContent className="grid gap-8 p-6 md:grid-cols-2">
                <div className="space-y-4">
                   <div className="flex h-full flex-col space-y-4">
                        <div>
                            <CardTitle>{left.title}</CardTitle>

                            {left.description && (
                                <CardDescription className="mt-2">
                                    {left.description}
                                </CardDescription>
                            )}
                        </div>

                        <div className="flex-1">
                            {left.children}
                        </div>

                        {left.footer && (
                            <>
                                <Separator />
                                <div className="pt-2">
                                    {left.footer}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <Separator
                    orientation="vertical"
                    className="hidden md:block"
                />

                <div className="space-y-4">
                   <div className="flex h-full flex-col space-y-4">
                        <div>
                            <CardTitle>
                                {right.title}
                            </CardTitle>
                        </div>
                        {right.description && (
                            <CardDescription className="mt-2">
                                {right.description}
                            </CardDescription>
                        )}
                    </div>

                    <div className="flex-1">
                        {right.children}
                    </div>

                    {right.footer && (
                        <>
                            <Separator />
                            <div className="pt-2">
                                {right.footer}
                            </div>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}