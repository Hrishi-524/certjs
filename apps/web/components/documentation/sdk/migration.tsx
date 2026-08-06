"use client";

import { MIGRATION } from "@/components/data/documentation/sdk/migration";

import AppLanguageTabs from "@/components/shared/app-language-tabs";
import ComparisonCard from "@/components/shared/comparison-card";
import GuideSection from "@/components/shared/guide-section";
import NotesCard from "@/components/shared/notes-card";

export default function Migration() {
    return (
        <section
            id="migration"
            className="space-y-8"
        >
            <GuideSection
                title={MIGRATION.title}
                description={MIGRATION.description}
            />

            <ComparisonCard
                left={{
                    title: "REST API",
                    description: "Direct HTTP requests.",
                    children: (
                        <AppLanguageTabs
                            snippets={[MIGRATION.snippets.before]}
                            codeBlockLabel="Before"
                        />
                    ),
                }}
                right={{
                    title: "CertJS SDK",
                    description: "Higher-level SDK abstraction.",
                    children: (
                        <AppLanguageTabs
                            snippets={[MIGRATION.snippets.after]}
                            codeBlockLabel="After"
                        />
                    ),
                }}
            />

            <NotesCard notes={MIGRATION.notes} />
        </section>
    );
}