import type { LanguageSnippet } from "@/components/shared/app-language-tabs";

import {
    JSON_SNIPPET,
    TYPESCRIPT_SNIPPET,
} from "./snippets";

export const CONFIGURATION = {
    title: "Configuration",

    description:
        "Configure CertJS using project-level configuration files.",

    snippets: {
        json: {
            id: "json",
            label: "certjs.config.json",
            language: "json" as const,
            code: JSON_SNIPPET,
        },

        typescript: {
            id: "typescript",
            label: "certjs.config.ts",
            language: "typescript" as const,
            code: TYPESCRIPT_SNIPPET,
        },
    } as Record<string, LanguageSnippet>,

    notes: [
        "Configuration files describe your certificate template.",
        "They are intended to be committed alongside your project.",
        "Project configuration replaces the need for a Dashboard Template ID.",
    ],
} as const;