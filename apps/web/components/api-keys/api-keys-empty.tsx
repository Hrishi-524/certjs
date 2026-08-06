"use client";

import { Key01Icon } from "@hugeicons/core-free-icons";

import { AppIcon } from "@/components/shared/app-icon";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type ApiKeysEmptyProps = {
    onCreate: () => void;
};

export default function ApiKeysEmpty({
    onCreate,
}: ApiKeysEmptyProps) {
    return (
        <Card className="border-dashed border-border/80 bg-muted/20 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center px-5 py-12 text-center">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border bg-background text-primary shadow-sm">
                    <AppIcon
                        icon={Key01Icon}
                        size={22}
                    />
                </div>

                <CardHeader className="space-y-2 p-0">
                    <CardTitle className="text-lg font-semibold tracking-tight">
                        No API keys yet
                    </CardTitle>

                    <CardDescription className="max-w-md leading-6">
                        Create a key to authenticate requests from your
                        application.
                    </CardDescription>
                </CardHeader>

                <Button
                    className="mt-5"
                    size="sm"
                    onClick={onCreate}
                >
                    <AppIcon icon={Key01Icon} />
                    Create API Key
                </Button>
            </CardContent>
        </Card>
    );
}
