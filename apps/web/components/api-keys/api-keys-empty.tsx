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
        <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <AppIcon
                        icon={Key01Icon}
                        size={28}
                    />
                </div>

                <CardHeader className="space-y-2 p-0">
                    <CardTitle>
                        No API Keys
                    </CardTitle>

                    <CardDescription className="max-w-md">
                        Create your first API key to authenticate
                        requests to the CertJS API. You'll use this
                        key in the <code>Authorization</code> header
                        of your applications.
                    </CardDescription>
                </CardHeader>

                <Button
                    className="mt-8"
                    onClick={onCreate}
                >
                    <AppIcon icon={Key01Icon} />
                    Create API Key
                </Button>
            </CardContent>
        </Card>
    );
}