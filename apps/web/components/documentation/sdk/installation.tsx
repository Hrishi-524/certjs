"use client";

import { INSTALLATION } from "@/components/data/documentation/sdk/installation";

import AppLanguageTabs from "@/components/shared/app-language-tabs";
import GuideSection from "@/components/shared/guide-section";
import NotesCard from "@/components/shared/notes-card";

export default function Installation() {
    return (
        <section
            id="installation"
            className="space-y-8"
        >
            <GuideSection
                title={INSTALLATION.title}
                description={INSTALLATION.description}
            />

            <AppLanguageTabs
                snippets={Object.values(INSTALLATION.snippets)}
                codeBlockLabel="Install SDK"
            />

            <NotesCard
                title="Next Steps"
                description="Before generating certificates, initialize the SDK with your API Key."
                notes={INSTALLATION.notes}
            />
        </section>
    );
}