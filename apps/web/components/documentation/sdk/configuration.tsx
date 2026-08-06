"use client";

import { CONFIGURATION } from "@/components/data/documentation/sdk/configuration";

import AppLanguageTabs from "@/components/shared/app-language-tabs";
import GuideSection from "@/components/shared/guide-section";
import NotesCard from "@/components/shared/notes-card";
import StepCard from "@/components/shared/step-card";

export default function Configuration() {
    return (
        <section
            id="configuration"
            className="space-y-8"
        >
            <GuideSection
                title={CONFIGURATION.title}
                description={CONFIGURATION.description}
            />

            <StepCard
                step={1}
                title="Create Configuration"
                description="Configure your project using a CertJS configuration file."
            >
                <AppLanguageTabs
                    snippets={Object.values(CONFIGURATION.snippets)}
                    codeBlockLabel="Configuration"
                />
            </StepCard>

            <NotesCard notes={CONFIGURATION.notes} />
        </section>
    );
}