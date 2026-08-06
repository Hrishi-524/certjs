import type { LanguageSnippet } from "@/components/shared/app-language-tabs";

import {
    JAVASCRIPT_SNIPPET,
    PYTHON_SNIPPET,
} from "./snippets";

export const WEBHOOKS = {
    title: "Webhooks",

    description:
        "Receive notifications automatically when certificate generation jobs complete.",

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
    } as Record<string, LanguageSnippet>,

    notes: [
        "Webhooks eliminate the need to continuously poll job status.",
        "Always verify incoming webhook requests.",
        "Retry failed webhook deliveries on your server.",
    ],
} as const;