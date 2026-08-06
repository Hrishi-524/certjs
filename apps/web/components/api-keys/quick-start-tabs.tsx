"use client";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import LanguageQuickStart from "./language-quick-start";

import { ApiKeysSnippets } from "@/components/data/api-keys/api-keys-snippets";

export default function QuickStartTabs() {
    const entries = Object.entries(ApiKeysSnippets);

    const defaultTab = entries[0]?.[0];

    return (
        <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="mb-8 h-auto w-full justify-start gap-1 overflow-x-auto rounded-xl border bg-muted/40 p-1">
                {entries.map(([key, value]) => (
                    <TabsTrigger
                        key={key}
                        value={key}
                        className="h-9 flex-none rounded-lg px-4 text-[13px] font-medium data-active:border-border data-active:bg-background data-active:shadow-sm"
                    >
                        {value.label}
                    </TabsTrigger>
                ))}
            </TabsList>

            {entries.map(([key, value]) => (
                <TabsContent
                    key={key}
                    value={key}
                    className="mt-0 focus-visible:outline-none"
                >
                    <LanguageQuickStart
                        language={value.language}
                        snippet={value}
                    />
                </TabsContent>
            ))}
        </Tabs>
    );
}
