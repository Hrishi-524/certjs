"use client";

import { Badge } from "@/components/ui/badge";

type EndpointBadgeProps = {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    path: string;
};

const METHOD_VARIANTS = {
    GET: "secondary",
    POST: "default",
    PUT: "outline",
    PATCH: "outline",
    DELETE: "destructive",
} as const;

export default function EndpointBadge({
    method,
    path,
}: EndpointBadgeProps) {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <Badge variant={METHOD_VARIANTS[method]}>
                {method}
            </Badge>

            <code className="rounded-md border bg-muted px-3 py-1.5 font-mono text-sm">
                {path}
            </code>
        </div>
    );
}