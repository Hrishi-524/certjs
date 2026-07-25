"use client";

import { Button } from "@/components/ui/button";
import RecipientPreview from "./recipint-preview";
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
        <section className="mx-auto w-full max-w-7xl px-8 pb-8">
            <div className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
                <div className="mb-5 flex items-center justify-between border-b pb-4">
                    <div>
                        <h2 className="text-base font-semibold">
                            Preview
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Review recipient data alongside the rendered certificate.
                        </p>
                    </div>

                    <span className="rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                        Step 3 / 4
                    </span>
                </div>

                <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
                    <RecipientPreview
                        recipient={recipient}
                    />

                    <CertificatePreview
                        previewUrl={previewUrl}
                        isLoading={isLoading}
                    />
                </div>

                <div className="mt-6 flex items-center justify-between border-t pt-5">
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