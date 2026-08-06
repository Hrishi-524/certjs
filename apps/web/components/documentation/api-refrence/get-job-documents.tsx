"use client";

import { GET_JOB_DOCUMENTS } from "@/components/data/documentation/api-refrence/get-job-documents";

import AppLanguageTabs from "@/components/shared/app-language-tabs";
import EndpointBadge from "@/components/shared/endpoint-badge";
import ParametersCard from "@/components/shared/parameters-card";
import ResponseCard from "@/components/shared/response-card";
import NotesCard from "@/components/shared/notes-card";
import ErrorsCard from "@/components/shared/errors-card";

export default function GetJobDocuments() {
    return (
        <section
            id="get-job-documents"
            className="space-y-8"
        >
            <EndpointBadge
                method={GET_JOB_DOCUMENTS.method}
                path={GET_JOB_DOCUMENTS.path}
            />

            <AppLanguageTabs
                snippets={Object.values(GET_JOB_DOCUMENTS.snippets)}
                codeBlockLabel="Request Example"
            />

            <ParametersCard
                title="Path Parameters"
                description="Parameters included in the request path."
                parameters={GET_JOB_DOCUMENTS.pathParameters}
            />

            <ResponseCard
                status={GET_JOB_DOCUMENTS.response.status}
                code={GET_JOB_DOCUMENTS.response.code}
                description="Returns all generated certificates associated with the specified job."
            />

            <NotesCard
                notes={GET_JOB_DOCUMENTS.notes}
            />

            <ErrorsCard
                errors={GET_JOB_DOCUMENTS.errors}
            />
        </section>
    );
}