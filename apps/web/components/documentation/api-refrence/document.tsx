"use client";

import { GET_DOCUMENT } from "@/components/data/documentation/api-refrence/document";

import AppLanguageTabs from "@/components/shared/app-language-tabs";
import EndpointBadge from "@/components/shared/endpoint-badge";
import ParametersCard from "@/components/shared/parameters-card";
import ResponseCard from "@/components/shared/response-card";
import NotesCard from "@/components/shared/notes-card";
import ErrorsCard from "@/components/shared/errors-card";

export default function GetDocument() {
    return (
        <section
            id="get-document"
            className="space-y-8"
        >
            <EndpointBadge
                method={GET_DOCUMENT.method}
                path={GET_DOCUMENT.path}
            />

            <AppLanguageTabs
                snippets={Object.values(GET_DOCUMENT.snippets)}
                codeBlockLabel="Request Example"
            />

            <ParametersCard
                title="Path Parameters"
                description="Parameters included in the request path."
                parameters={GET_DOCUMENT.pathParameters}
            />

            <ResponseCard
                status={GET_DOCUMENT.response.status}
                code={GET_DOCUMENT.response.code}
                description="Returns the requested document along with its associated job metadata."
            />

            <NotesCard
                notes={GET_DOCUMENT.notes}
            />

            <ErrorsCard
                errors={GET_DOCUMENT.errors}
            />
        </section>
    );
}