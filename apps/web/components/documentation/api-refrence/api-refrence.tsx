"use client";

import CreateJob from "./create-job";
import GetJobStatus from "./get-job-status";
import DownloadZip from "./download-job-zip";

import { Separator } from "@/components/ui/separator";
import RetryJob from "./retry-job";
import GetJobDocuments from "./get-job-documents";

export default function ApiReference() {
    return (
        <section
            id="api-reference"
            className="space-y-12"
        >
            <div className="space-y-2">
                <h2 className="text-4xl font-bold tracking-tight">
                    API Reference
                </h2>

                <p className="max-w-3xl text-muted-foreground">
                    Complete reference for every CertJS REST API endpoint,
                    including request examples, parameters, responses, and
                    common error codes.
                </p>
            </div>

            <Separator />
            <CreateJob />

            <Separator />
            <GetJobStatus />

            <Separator />
            <DownloadZip />

            <Separator />
            <RetryJob />
             
            <Separator />
            <GetJobDocuments />
            {/*
                <Separator />
                <VerifyCertificate />
            */}
        </section>
    );
}