"use client";

import { useState } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/shared/app-icon";
import { Download04Icon } from "@hugeicons/core-free-icons";

import { downloadBatchJobDocuments } from "@/lib/api/jobs";
import { GetBatchJobStatusResponse } from "@/types/jobs.types";

type DownloadCardProps = {
    job: GetBatchJobStatusResponse;
};

export default function DownloadCard({
    job,
}: DownloadCardProps) {
    const [isDownloading, setIsDownloading] = useState(false);

    async function handleDownload() {
        try {
            setIsDownloading(true);

            const { presignedZipUrl } = await downloadBatchJobDocuments(job.meta.jobId);

            window.location.href = presignedZipUrl;
        } finally {
            setIsDownloading(false);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Download Certificates</CardTitle>

                <CardDescription>
                    Your batch has finished processing. Download all generated
                    certificates as a ZIP archive.
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="font-medium">
                        Ready to download
                    </p>

                    <p className="text-sm text-muted-foreground">
                        {job.meta.processedCount} certificates generated and
                        packaged.
                    </p>
                </div>

                <Button
                    size="lg"
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="gap-2"
                >
                    <AppIcon icon={Download04Icon} />

                    {isDownloading
                        ? "Preparing download..."
                        : "Download ZIP"}
                </Button>
            </CardContent>
        </Card>
    );
}