import type { LanguageSnippet } from "@/components/shared/app-language-tabs";

import {
    JAVASCRIPT_SNIPPET,
    PYTHON_SNIPPET,
    JAVA_SNIPPET,
    R_SNIPPET,
    C_SHARP_SNIPPET,
    CPP_SNIPPET,
    TERMINAL_SNIPPET,
    RETRY_JOB_RESPONSE,
} from "./retry-job/languages";

export const RETRY_JOB = {
    method: "POST",

    path: "/api/v1/jobs/:jobId/retry",

    title: "Retry Job",

    description:
        "Queues failed documents from a previously processed job for another generation attempt. Successfully generated documents are not retried.",

    snippets: {
        javascript: {
            id: "javascript",
            label: "JavaScript",
            language: "typescript" as const,
            code: JAVASCRIPT_SNIPPET,
        },

        python: {
            id: "python",
            label: "Python",
            language: "python" as const,
            code: PYTHON_SNIPPET,
        },

        java: {
            id: "java",
            label: "Java",
            language: "java" as const,
            code: JAVA_SNIPPET,
        },

        r: {
            id: "r",
            label: "R",
            language: "r" as const,
            code: R_SNIPPET,
        },

        c_sharp: {
            id: "c_sharp",
            label: "C#",
            language: "csharp" as const,
            code: C_SHARP_SNIPPET,
        },

        cpp: {
            id: "cpp",
            label: "C++",
            language: "cpp" as const,
            code: CPP_SNIPPET,
        },

        terminal: {
            id: "terminal",
            label: "Terminal",
            language: "bash" as const,
            code: TERMINAL_SNIPPET,
        },
    } as Record<string, LanguageSnippet>,

    pathParameters: [
        {
            field: "jobId",
            type: "UUID",
            required: true,
            description:
                "Identifier of the job whose failed documents should be retried.",
        },
    ],

    response: {
        status: 200,
        code: RETRY_JOB_RESPONSE,
    },

    notes: [
        "Only failed documents are queued for retry.",
        "Previously completed documents are not regenerated.",
        "The returned retry count indicates how many documents were queued again.",
    ],

    errors: [
        {
            status: 400,
            title: "Bad Request",
            description: "Invalid Job ID format.",
        },
        {
            status: 401,
            title: "Unauthorized",
            description: "Missing or invalid API Key.",
        },
        {
            status: 404,
            title: "Job Not Found",
            description: "The specified job does not exist.",
        },
        {
            status: 409,
            title: "No Failed Documents",
            description: "The job has no failed documents available for retry.",
        },
    ],
} as const;