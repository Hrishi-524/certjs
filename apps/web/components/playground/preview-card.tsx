"use client";

import { Button } from "@/components/ui/button";
import RecipientPreview from "./recipient-preview";
import CertificatePreview from "./certificate-preview";
import type { UploadedRow } from "@/types/components/playground.types";

type PreviewCardProps = {
    rows: UploadedRow[];

    selectedRow: number;

    previewUrl?: string;

    isLoading: boolean;

    onPrevious: () => void;

    onNext: () => void;
};

function PreviewCard({
    rows,
    selectedRow,
    previewUrl,
    isLoading,
    onPrevious,
    onNext,
}: PreviewCardProps) {
    const recipient = rows[selectedRow];

    if (!recipient) return null;

    return (
        <section>
            <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-4 border-b pb-3">
                    <div className="flex items-center gap-3">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full border bg-muted text-xs font-semibold text-muted-foreground">
                            3
                        </span>
                        <div>
                            <h2 className="text-base font-semibold">
                            Preview
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Review recipient data alongside the rendered certificate.
                            </p>
                        </div>
                    </div>

                    <span className="rounded-full border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        Step 3 / 4
                    </span>
                </div>

                <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
                    <RecipientPreview
                        recipient={recipient}
                    />

                    <CertificatePreview
                        previewUrl={previewUrl}
                        isLoading={isLoading}
                    />
                </div>

                <div className="mt-4 flex items-center justify-between border-t pt-4">
                    <Button
                        variant="outline"
                        onClick={onPrevious}
                        disabled={selectedRow === 0 || isLoading}
                    >
                        Previous
                    </Button>

                    <span className="text-sm text-muted-foreground">
                        {selectedRow + 1} / {rows.length}
                    </span>

                    <Button
                        onClick={onNext}
                        disabled={
                            selectedRow === rows.length - 1 ||
                            isLoading
                        }
                    >
                        Next
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default PreviewCard;
