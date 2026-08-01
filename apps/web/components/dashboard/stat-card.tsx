"use client";

import { AppIcon } from "@/components/shared/app-icon";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

type StatCardProps = {
    title: string;
    value: number;
    icon: React.ComponentProps<typeof AppIcon>["icon"];
};

export default function StatCard({
    title,
    value,
    icon,
}: StatCardProps) {
    return (
        <Card className="shadow-sm">
            <CardContent className="flex items-start justify-between p-6">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight">
                        {value.toLocaleString()}
                    </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg border bg-muted/40">
                    <AppIcon
                        icon={icon}
                        size={22}
                    />
                </div>
            </CardContent>
        </Card>
    );
}