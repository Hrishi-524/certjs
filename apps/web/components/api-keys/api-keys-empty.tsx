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
        <Card className="border-dashed bg-muted/20">
            <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border bg-background text-primary">
                    <AppIcon
                        icon={Key01Icon}
                        size={22}
                    />
                </div>

                <CardHeader className="space-y-1 p-0">
                    <CardTitle>
                        No API keys yet
                    </CardTitle>

                    <CardDescription className="max-w-md">
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
