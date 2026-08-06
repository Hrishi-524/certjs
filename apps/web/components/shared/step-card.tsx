"use client";

import type { ReactNode } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type StepCardProps = {
    step: number;
    title: string;
    description?: string;
    children: ReactNode;
    action?: ReactNode;
};

export default function StepCard({
    step,
    title,
    description,
    children,
    action,
}: StepCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardDescription>
                    Step {step}
                </CardDescription>

                <CardTitle>
                    {title}
                </CardTitle>

                {description && (
                    <CardDescription>
                        {description}
                    </CardDescription>
                )}
            </CardHeader>

           <CardContent className="space-y-6">
                {children}

                {action && (
                    <div className="flex justify-end">
                        {action}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}