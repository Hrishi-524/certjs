"use client";

import Link from "next/link";

import {
    ArrowRight01Icon,
    Image01Icon,
    Tick02Icon,
} from "@hugeicons/core-free-icons";

import { AppIcon } from "@/components/shared/app-icon";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

import { DashboardRecentTemplate } from "@/types/dashboard.types";

type RecentTemplateCardProps = {
    template: DashboardRecentTemplate;
};

export default function RecentTemplateCard({
    template,
}: RecentTemplateCardProps) {
    return (
        <Card className="overflow-hidden pt-0">
            <div className="relative aspect-[16/9] border-b bg-muted/60">
                {template.presignedUrl ? (
                    <img
                        src={template.presignedUrl}
                        alt={`${template.name} template preview`}
                        className="aspect-video w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        <AppIcon
                            icon={Image01Icon}
                            size={32}
                        />
                    </div>
                )}

                {template.isActive && (
                    <Badge className="absolute right-3 top-3 shadow-sm">
                        <AppIcon
                            icon={Tick02Icon}
                            size={14}
                        />

                        Active
                    </Badge>
                )}
            </div>

            <CardContent className="space-y-1.5 p-4">
                <div className="min-w-0">
                    <h3 className="line-clamp-1 text-sm font-semibold">
                        {template.name}
                    </h3>

                    <p className="text-xs text-muted-foreground">
                        Version {template.version}
                    </p>
                </div>
            </CardContent>

            <CardFooter className="border-t bg-muted/20 px-4 py-3">
                <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="ml-auto"
                >
                    <Link href={`/dashboard/templates/${template.id}`}>
                        View

                        <AppIcon icon={ArrowRight01Icon} />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
