"use client";

import type { ReactNode } from "react";

import {
    Card,
    CardContent,
    CardDescription,
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
    const renderSide = (side: ComparisonSide) => (
        <div className="flex h-full min-h-0 flex-col">
            <div>
                <CardTitle>{side.title}</CardTitle>

                {side.description && (
                    <CardDescription className="mt-2">
                        {side.description}
                    </CardDescription>
                )}
            </div>

            <Separator className="my-4" />

            <div className="min-h-0 flex-1">
                {side.children}
            </div>

            {side.footer && (
                <>
                    <Separator className="my-4" />
                    <div>
                        {side.footer}
                    </div>
                </>
            )}
        </div>
    );

    return (
        <Card>
            <CardContent className="grid items-stretch gap-6 p-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-8">
                {renderSide(left)}

                <Separator
                    orientation="vertical"
                    className="hidden h-full md:block"
                />

                {renderSide(right)}
            </CardContent>
        </Card>
    );
}
