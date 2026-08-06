import type { LanguageSnippet } from "@/components/shared/app-language-tabs";

import {
    JAVASCRIPT_SNIPPET,
    PYTHON_SNIPPET,
    JAVA_SNIPPET,
    R_SNIPPET,
    C_SHARP_SNIPPET,
    CPP_SNIPPET,
    TERMINAL_SNIPPET,
    GET_JOB_DOCUMENTS_RESPONSE,
} from "@/components/data/documentation/api-refrence/get-job-documents/language";

export const GET_JOB_DOCUMENTS = {
    method: "GET",

    path: "/api/v1/jobs/:jobId/documents",

    title: "Get Job Documents",

    description:
        "Retrieves all generated certificates associated with a completed job.",

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
                "Identifier of the completed job whose generated certificates should be retrieved.",
        },
    ],

    response: {
        status: 200,
        code: GET_JOB_DOCUMENTS_RESPONSE,
    },

    notes: [
        "Returns metadata for every generated certificate in the job.",
        "Each document includes a verification token.",
        "Use the download endpoint to download all certificates as a ZIP archive.",
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
    ],
} as const;