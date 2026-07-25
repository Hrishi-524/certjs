"use client";

import Image from "next/image";
import { AppIcon } from "@/components/shared/app-icon";
import { Skeleton } from "@/components/ui/skeleton";
import { Image01Icon } from "@hugeicons/core-free-icons";

type CertificatePreviewProps = {
    previewUrl?: string;
    isLoading: boolean;
};

function CertificatePreview({
    previewUrl,
    isLoading,
}: CertificatePreviewProps) {
    if (isLoading) {
        return (
            <div className="flex h-full min-h-[500px] items-center justify-center rounded-xl border bg-muted/20 p-6">
                <Skeleton className="aspect-[16/9] w-full max-w-3xl rounded-lg" />
            </div>
        );
    }

    if (!previewUrl) {
        return (
            <div className="flex h-full min-h-[500px] flex-col items-center justify-center rounded-xl border bg-muted/20 p-6 text-center">
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
                    <AppIcon
                        icon={Image01Icon}
                        className="size-6 text-muted-foreground"
                    />
                </div>

                <h3 className="text-base font-semibold">
                    Certificate Preview
                </h3>

                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Upload a valid dataset and select a recipient to render
                    a live certificate preview.
                </p>
            </div>
        );
    }

    return (
        <div className="flex h-full min-h-[500px] items-center justify-center rounded-xl border bg-muted/20 p-6">
            <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
                <Image
                    src={previewUrl}
                    alt="Certificate Preview"
                    width={1200}
                    height={675}
                    unoptimized
                    className="h-auto w-full max-w-4xl object-contain"
                />
            </div>
        </div>
    );
}

export default CertificatePreview;