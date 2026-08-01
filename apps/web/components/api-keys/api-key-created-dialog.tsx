"use client";

import { useState } from "react";

import {
    Copy01Icon,
    Download01Icon,
    InformationCircleIcon,
    Tick02Icon,
} from "@hugeicons/core-free-icons";

import { AppIcon } from "@/components/shared/app-icon";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type ApiKeyCreatedDialogProps = {
    open: boolean;
    apiKey: string;

    onOpenChange: (open: boolean) => void;
};

export default function ApiKeyCreatedDialog({
    open,
    apiKey,
    onOpenChange,
}: ApiKeyCreatedDialogProps) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        await navigator.clipboard.writeText(apiKey);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    function handleDownload() {
        const blob = new Blob([apiKey], {
            type: "text/plain",
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = "certjs-api-key.txt";

        a.click();

        URL.revokeObjectURL(url);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        API Key Created
                    </DialogTitle>

                    <DialogDescription>
                        Store this API key securely. You won&apos;t be
                        able to view it again after closing this
                        dialog.
                    </DialogDescription>
                </DialogHeader>

                <div className="rounded-lg border bg-muted/40 p-4 font-mono text-sm break-all">
                    {apiKey}
                </div>

                <div className="flex gap-3 rounded-lg border border-amber-300/40 bg-amber-100/60 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
                    <AppIcon
                        icon={InformationCircleIcon}
                        className="mt-0.5 shrink-0"
                    />

                    <p>
                        This is the only time the full API key will
                        be shown. Copy or download it before
                        continuing.
                    </p>
                </div>

                <DialogFooter className="justify-between">
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={handleCopy}
                        >
                            <AppIcon
                                icon={
                                    copied
                                        ? Tick02Icon
                                        : Copy01Icon
                                }
                            />

                            {copied
                                ? "Copied"
                                : "Copy"}
                        </Button>

                        <Button
                            variant="outline"
                            onClick={handleDownload}
                        >
                            <AppIcon
                                icon={Download01Icon}
                            />
                            Download
                        </Button>
                    </div>

                    <Button
                        onClick={() =>
                            onOpenChange(false)
                        }
                    >
                        Done
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
