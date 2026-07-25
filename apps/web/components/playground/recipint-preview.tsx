"use client";

import type { UploadedRow } from "@/types/components/playground.types";

type RecipientPreviewProps = {
    recipient: UploadedRow;
};

function RecipientPreview({
    recipient,
}: RecipientPreviewProps) {
    return (
        <div className="rounded-xl border bg-muted/20 p-5">
            <div className="mb-5 border-b pb-3">
                <h3 className="font-semibold">
                    Recipient Data
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                    Values used to render the current certificate.
                </p>
            </div>

            <div className="space-y-4">
                {Object.entries(recipient).map(([key, value]) => (
                    <div
                        key={key}
                        className="flex flex-col gap-1 rounded-lg border bg-background p-3"
                    >
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            {key}
                        </span>

                        <span className="break-all text-sm font-medium">
                            {String(value)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecipientPreview;