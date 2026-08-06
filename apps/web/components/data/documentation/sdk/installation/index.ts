import type { LanguageSnippet } from "@/components/shared/app-language-tabs";

import {
    NPM_SNIPPET,
    PNPM_SNIPPET,
    YARN_SNIPPET,
    BUN_SNIPPET,
} from "./snippets";

export const INSTALLATION = {
    title: "Installation",

    description:
        "Install the official CertJS SDK using your preferred package manager.",

    snippets: {
        npm: {
            id: "npm",
            label: "npm",
            language: "bash" as const,
            code: NPM_SNIPPET,
        },

        pnpm: {
            id: "pnpm",
            label: "pnpm",
            language: "bash" as const,
            code: PNPM_SNIPPET,
        },

        yarn: {
            id: "yarn",
            label: "Yarn",
            language: "bash" as const,
            code: YARN_SNIPPET,
        },

        bun: {
            id: "bun",
            label: "Bun",
            language: "bash" as const,
            code: BUN_SNIPPET,
        },
    } as Record<string, LanguageSnippet>,

    notes: [
        "The SDK requires Node.js 18 or later.",
        "An API Key is required for cloud-based certificate generation.",
        "After installation, continue to the Initialization guide.",
    ],
} as const;