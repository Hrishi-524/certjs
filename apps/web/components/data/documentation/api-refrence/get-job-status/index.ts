import type { LanguageSnippet } from "@/components/shared/app-language-tabs";

import {
    JAVASCRIPT_SNIPPET,
    PYTHON_SNIPPET,
    JAVA_SNIPPET,
    R_SNIPPET,
    C_SHARP_SNIPPET,
    CPP_SNIPPET,
    TERMINAL_SNIPPET,
} from "./snippets";
import { GET_JOB_STATUS_RESPONSE } from "./response";

export const GET_JOB_STATUS = {
    method: "GET",
    path: "/api/v1/jobs/:jobId",

    title: "Get Job Status",

    description:
        "Retrieves the current status and progress of a previously submitted certificate generation job.",

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

    requestBody: [],

    pathParameters: [
        {
            field: "jobId",
            type: "UUID",
            required: true,
            description:
                "Identifier of the job returned when creating a batch.",
        },
    ],

    response: {
        status: 200,
        code: GET_JOB_STATUS_RESPONSE,
    },

    notes: [
        "Poll this endpoint until the job reaches a terminal state.",
        "A completed job can be used to retrieve generated documents or download the ZIP archive.",
        "If a webhook URL was supplied when creating the job, polling is optional.",
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