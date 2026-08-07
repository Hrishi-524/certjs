"use client";

import AppLanguageTabs from "@/components/shared/app-language-tabs";
import { CREATE_JOB } from "@/components/data/documentation/api-refrence/create-job";
import EndpointBadge from "@/components/shared/endpoint-badge";
import ParametersCard from "@/components/shared/parameters-card";
import ResponseCard from "@/components/shared/response-card";
import NotesCard from "@/components/shared/notes-card";
import ErrorsCard from "@/components/shared/errors-card";

export default function CreateJob() {
    return (
        <section id="create-job" className="space-y-8">
            <EndpointBadge
                method={CREATE_JOB.method}
                path={CREATE_JOB.path}
            />
            <AppLanguageTabs
                snippets={Object.values(CREATE_JOB.snippets)}
                codeBlockLabel="Request Example"
            />
            <ParametersCard
                title="Request Body"
                description="Fields accepted by this endpoint."
                parameters={CREATE_JOB.requestBody}
            />
            <ResponseCard
                status={CREATE_JOB.response.status}
                code={CREATE_JOB.response.code}
                title="Response"
                description="Response returned by this endpoint."
                language="json"
            />
            <NotesCard 
                notes={CREATE_JOB.notes}
                title="Notes"
                description="Additional information about this endpoint."
            />
            <ErrorsCard
                errors={CREATE_JOB.errors}
            />
        </section>
    );
}