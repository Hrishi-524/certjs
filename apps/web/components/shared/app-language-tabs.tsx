"use client";

import type { BundledLanguage } from "@/components/ui/code-block";
import AppCodeBlock from "./app-code-block";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

export type LanguageSnippet = {
    id: string;
    label: string;
    language: BundledLanguage;
    code: string;
};

export type AppLanguageTabsProps = {
    snippets: LanguageSnippet[];
    codeBlockLabel?: string;
};

export default function AppLanguageTabs({
    snippets,
    codeBlockLabel = "Example",
}: AppLanguageTabsProps) {
    const defaultTab = snippets[0]?.id;

    return (
        <Tabs
            defaultValue={defaultTab}
            className="w-full gap-0"
        >
            <TabsList className="mb-4 h-fit max-h-fit w-full justify-start gap-1 overflow-x-auto overflow-y-hidden rounded-xl border bg-muted/40 p-1 whitespace-nowrap">
                {snippets.map((snippet) => (
                    <TabsTrigger
                        key={snippet.id}
                        value={snippet.id}
                        className="h-9 flex-none rounded-lg px-4 text-[13px] font-medium data-active:border-border data-active:bg-background data-active:shadow-sm"
                    >
                        {snippet.label}
                    </TabsTrigger>
                ))}
            </TabsList>

            {snippets.map((snippet) => (
                <TabsContent
                    key={snippet.id}
                    value={snippet.id}
                    className="mt-0 focus-visible:outline-none"
                >
                    <AppCodeBlock
                        language={snippet.language}
                        label={codeBlockLabel}
                        code={snippet.code}
                    />
                </TabsContent>
            ))}
        </Tabs>
    );
}
