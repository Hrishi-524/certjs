"use client";

import AppCodeBlock from "./app-code-block";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type ResponseCardProps = {
    status: number;
    code: string;

    title?: string;
    description?: string;

    language?: "json";
};

export default function ResponseCard({
    status,
    code,
    title = "Response",
    description = "Response returned by this endpoint.",
    language = "json",
}: ResponseCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {title}{" "}
                    <span className="text-muted-foreground">
                        ({status})
                    </span>
                </CardTitle>

                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <AppCodeBlock
                    language={language}
                    label={`${status}`}
                    code={code}
                />
            </CardContent>
        </Card>
    );
}