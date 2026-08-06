import type { LanguageSnippet } from "@/components/shared/app-language-tabs";

import {
    API_TEMPLATE_SNIPPET,
    LOCAL_TEMPLATE_SNIPPET,
} from "./snippets";

export const TEMPLATES = {
    title: "Templates",

    description:
        "CertJS supports two template workflows. Choose the approach that best fits your application.",

    snippets: {
        api: {
            id: "api",
            label: "Dashboard Template",
            language: "typescript" as const,
            code: API_TEMPLATE_SNIPPET,
        },

        local: {
            id: "local",
            label: "Local Template",
            language: "typescript" as const,
            code: LOCAL_TEMPLATE_SNIPPET,
        },
    } as Record<string, LanguageSnippet>,

    notes: [
        "Dashboard templates are recommended for SaaS applications and shared teams.",
        "Local templates allow certificates to remain entirely within your project.",
        "Both workflows expose the same SDK interface after initialization.",
    ],
} as const;