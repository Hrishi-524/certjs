import type { LanguageSnippet } from "@/components/shared/app-language-tabs";

import {
    JAVASCRIPT_SNIPPET,
    PYTHON_SNIPPET,
    JAVA_SNIPPET,
    C_SHARP_SNIPPET,
} from "./snippets";

export const INITIALIZATION = {
    title: "Initialization",

    description:
        "Create a CertJS client using your API Key. The client is reused for all subsequent SDK operations.",

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
        "Create a single CertJS client and reuse it throughout your application.",
        "Store your API Key in an environment variable instead of hardcoding it.",
        "After initialization, choose whether to generate certificates using Dashboard templates or local project templates.",
    ],
} as const;