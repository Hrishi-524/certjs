import type { LanguageSnippet } from "@/components/shared/app-language-tabs";

import {
    JAVASCRIPT_SNIPPET,
    PYTHON_SNIPPET,
    JAVA_SNIPPET,
    R_SNIPPET,
    C_SHARP_SNIPPET,
    CPP_SNIPPET,
    TERMINAL_SNIPPET,
    GET_DOCUMENT_RESPONSE,
} from "./document/language";

export const GET_DOCUMENT = {
    method: "GET",

    path: "/api/v1/documents/:documentId",

    title: "Get Document",

    description:
        "Retrieves a generated document along with its associated job metadata.",

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
            field: "documentId",
            type: "UUID",
            required: true,
            description:
                "Identifier of the generated document to retrieve.",
        },
    ],

    response: {
        status: 200,
        code: GET_DOCUMENT_RESPONSE,
    },

    notes: [
        "Returns both document metadata and the associated job metadata.",
        "The recipientData object reflects the values used during certificate generation.",
        "If available, s3Url points to the generated certificate stored in object storage.",
    ],

    errors: [
        {
            status: 400,
            title: "Bad Request",
            description: "Invalid Document ID format.",
        },
        {
            status: 401,
            title: "Unauthorized",
            description: "Missing or invalid API Key.",
        },
        {
            status: 404,
            title: "Document Not Found",
            description: "The specified document does not exist.",
        },
    ],
} as const;