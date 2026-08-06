import type { LanguageSnippet } from "@/components/shared/app-language-tabs";

import { JAVASCRIPT_SNIPPET, PYTHON_SNIPPET, JAVA_SNIPPET, R_SNIPPET, C_SHARP_SNIPPET, CPP_SNIPPET, TERMINAL_SNIPPET, POST_JOBS_RESPONSE } from "@/components/data/documentation/api-refrence/create-job/language";

export const CREATE_JOB = {
    method: "POST",
    path: "/api/v1/jobs",
    title: "Create Job",
    description: "Queues one or more recipients for certificate generation. The API immediately returns a Job ID while recipients are processed asynchronously.",

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

    requestBody: [
        {
            field: "templateId",
            type: "UUID",
            required: true,
            description: "Unique identifier of the saved certificate template.",
        },
        {
            field: "recipients",
            type: "Recipient[]",
            required: true,
            description:
                "List of recipients used to generate certificates.",
        },
        {
            field: "idempotencyKey",
            type: "string",
            required: true,
            description:
                "Ensures duplicate requests are processed only once.",
        },
        {
            field: "webhookUrl",
            type: "URL",
            required: false,
            description:
                "Receives a callback when the job completes.",
        },
    ],

    response: {
        status: 201,
        code: POST_JOBS_RESPONSE,
    },

    notes: [
        "Certificate generation is asynchronous.",
        "Use the returned Job ID to track progress.",
        "A webhook can be supplied instead of polling.",
    ],

    errors: [
        {
            status: 400,
            title: "Bad Request",
            description: "Request validation failed.",
        },
        {
            status: 401,
            title: "Unauthorized",
            description: "Missing or invalid API Key.",
        },
        {
            status: 404,
            title: "Template Not Found",
            description:
                "The provided Template ID does not exist.",
        },
    ],
} as const;