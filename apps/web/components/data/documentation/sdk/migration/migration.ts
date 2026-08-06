import type { LanguageSnippet } from "@/components/shared/app-language-tabs";

import {
    BEFORE_SNIPPET,
    AFTER_SNIPPET,
} from "./language";

export const MIGRATION = {
    title: "Migration",

    description:
        "Migrate existing REST API integrations to the CertJS SDK.",

    snippets: {
        before: {
            id: "before",
            label: "REST API",
            language: "typescript" as const,
            code: BEFORE_SNIPPET,
        },

        after: {
            id: "after",
            label: "CertJS SDK",
            language: "typescript" as const,
            code: AFTER_SNIPPET,
        },
    } as Record<string, LanguageSnippet>,

    notes: [
        "The SDK internally communicates with the same REST API.",
        "Migration primarily reduces boilerplate rather than changing functionality.",
        "Existing API integrations can continue to operate alongside the SDK.",
    ],
} as const;
