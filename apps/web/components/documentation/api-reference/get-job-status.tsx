"use client";

import AppLanguageTabs from "@/components/shared/app-language-tabs";
import EndpointBadge from "@/components/shared/endpoint-badge";
import ParametersCard from "@/components/shared/parameters-card";
import ResponseCard from "@/components/shared/response-card";
import NotesCard from "@/components/shared/notes-card";
import ErrorsCard from "@/components/shared/errors-card";

import { GET_JOB_STATUS } from "@/components/data/documentation/api-refrence/get-job-status";

export default function GetJobStatus() {
    return (
        <section
            id="get-job-status"
            className="space-y-8"
        >
            <EndpointBadge
                method={GET_JOB_STATUS.method}
                path={GET_JOB_STATUS.path}
            /
            >

            <AppLanguageTabs
                snippets={Object.values(GET_JOB_STATUS.snippets)}
                codeBlockLabel="Request Example"
            />

            <ParametersCard
                title="Path Parameters"
                description="Parameters included in the request path."
                parameters={GET_JOB_STATUS.pathParameters}
            />

            <ResponseCard
                status={GET_JOB_STATUS.response.status}
                code={GET_JOB_STATUS.response.code}
                description="Current status and progress of the requested job."
            />

            <NotesCard
                notes={GET_JOB_STATUS.notes}
            />

            <ErrorsCard
                errors={GET_JOB_STATUS.errors}
            />
        </section>
    );
}