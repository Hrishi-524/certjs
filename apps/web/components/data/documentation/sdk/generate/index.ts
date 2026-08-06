import type { LanguageSnippet } from "@/components/shared/app-language-tabs";

import {
    JAVASCRIPT_SNIPPET,
    PYTHON_SNIPPET,
    JAVA_SNIPPET,
    C_SHARP_SNIPPET,
} from "./snippets";

export const GENERATE = {
    title: "Generate Certificates",

    description:
        "Generate one or more certificates using the configured template.",

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

        c_sharp: {
            id: "c_sharp",
            label: "C#",
            language: "csharp" as const,
            code: C_SHARP_SNIPPET,
        },
    } as Record<string, LanguageSnippet>,

    notes: [
        "Recipients are processed asynchronously.",
        "Each generation request creates a Job.",
        "Monitor progress or configure webhooks for completion events.",
    ],
} as const;
