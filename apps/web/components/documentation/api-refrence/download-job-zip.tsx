"use client";

import { DOWNLOAD_JOB_ZIP } from "@/components/data/documentation/api-refrence/download-job-zip";

import AppLanguageTabs from "@/components/shared/app-language-tabs";
import EndpointBadge from "@/components/shared/endpoint-badge";
import ParametersCard from "@/components/shared/parameters-card";
import ResponseCard from "@/components/shared/response-card";
import NotesCard from "@/components/shared/notes-card";
import ErrorsCard from "@/components/shared/errors-card";

export default function DownloadJobZip() {
    return (
        <section
            id="download-job-zip"
            className="space-y-8"
        >
            <EndpointBadge
                method={DOWNLOAD_JOB_ZIP.method}
                path={DOWNLOAD_JOB_ZIP.path}
            />

            <AppLanguageTabs
                snippets={Object.values(DOWNLOAD_JOB_ZIP.snippets)}
                codeBlockLabel="Request Example"
            />

            <ParametersCard
                title="Path Parameters"
                description="Parameters included in the request path."
                parameters={DOWNLOAD_JOB_ZIP.pathParameters}
            />

            <ResponseCard
                status={DOWNLOAD_JOB_ZIP.response.status}
                code={DOWNLOAD_JOB_ZIP.response.code}
                description="Returns a pre-signed URL for downloading the generated certificates ZIP."
            />

            <NotesCard
                notes={DOWNLOAD_JOB_ZIP.notes}
            />

            <ErrorsCard
                errors={DOWNLOAD_JOB_ZIP.errors}
            />
        </section>
    );
}
