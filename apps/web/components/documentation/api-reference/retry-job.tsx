"use client";

import { RETRY_JOB } from "@/components/data/documentation/api-refrence/retry-job";

import AppLanguageTabs from "@/components/shared/app-language-tabs";
import EndpointBadge from "@/components/shared/endpoint-badge";
import ParametersCard from "@/components/shared/parameters-card";
import ResponseCard from "@/components/shared/response-card";
import NotesCard from "@/components/shared/notes-card";
import ErrorsCard from "@/components/shared/errors-card";

export default function RetryJob() {
    return (
        <section
            id="retry-job"
            className="space-y-8"
        >
            <EndpointBadge
                method={RETRY_JOB.method}
                path={RETRY_JOB.path}
            />

            <AppLanguageTabs
                snippets={Object.values(RETRY_JOB.snippets)}
                codeBlockLabel="Request Example"
            />

            <ParametersCard
                title="Path Parameters"
                description="Parameters included in the request path."
                parameters={RETRY_JOB.pathParameters}
            />

            <ResponseCard
                status={RETRY_JOB.response.status}
                code={RETRY_JOB.response.code}
                description="Confirms that failed documents have been queued for retry."
            />

            <NotesCard
                notes={RETRY_JOB.notes}
            />

            <ErrorsCard
                errors={RETRY_JOB.errors}
            />
        </section>
    );
}