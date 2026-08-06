// components/data/documentation/authentication.ts

import {
    Key01Icon,
    ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

import {
    JAVASCRIPT_AUTH_SNIPPET,
    PYTHON_AUTH_SNIPPET,
    JAVA_AUTH_SNIPPET,
    CPP_AUTH_SNIPPET,
    C_SHARP_AUTH_SNIPPET,
    R_AUTH_SNIPPET,
    TERMINAL_AUTH_SNIPPET,
} from "./languages";

export const AUTHENTICATION = {
    title: "Authentication",

    description:
        "Every request to the CertJS REST API must include your API key in the X-Api-Key request header.",

    icon: Key01Icon,

    header: {
        name: "X-Api-Key",
        value: "<your-api-key>",
    },

    snippets: {
        javascript: {
            id: "javascript",
            label: "JavaScript",
            language: "typescript" as const,
            code: JAVASCRIPT_AUTH_SNIPPET,
        },

        python: {
            id: "python",
            label: "Python",
            language: "python" as const,
            code: PYTHON_AUTH_SNIPPET,
        },

        java: {
            id: "java",
            label: "Java",
            language: "java" as const,
            code: JAVA_AUTH_SNIPPET,
        },

        cpp: {
            id: "cpp",
            label: "C++",
            language: "cpp" as const,
            code: CPP_AUTH_SNIPPET,
        },

        csharp: {
            id: "csharp",
            label: "C#",
            language: "csharp" as const,
            code: C_SHARP_AUTH_SNIPPET,
        },

        r: {
            id: "r",
            label: "R",
            language: "r" as const,
            code: R_AUTH_SNIPPET,
        },

        terminal: {
            id: "terminal",
            label: "Terminal",
            language: "bash" as const,
            code: TERMINAL_AUTH_SNIPPET,
        },
    },

    notes: [
        "API keys are scoped to your workspace.",
        "Keep API keys secure and never expose them in client-side applications.",
        "Generate and manage API keys from the Dashboard.",
    ],

    cta: {
        title: "Manage API Keys",
        href: "/dashboard/api-keys",
        icon: ArrowRight01Icon,
    },
} as const;