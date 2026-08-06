"use client";

import { GENERATE } from "@/components/data/documentation/sdk/generate";

import AppLanguageTabs from "@/components/shared/app-language-tabs";
import GuideSection from "@/components/shared/guide-section";
import NotesCard from "@/components/shared/notes-card";
import StepCard from "@/components/shared/step-card";

export default function Generate() {
    return (
        <section
            id="generate"
            className="space-y-8"
        >
            <GuideSection
                title={GENERATE.title}
                description={GENERATE.description}
            />

            <StepCard
                step={1}
                title="Generate Certificates"
                description="Submit one or more recipients to generate certificates."
            >
                <AppLanguageTabs
                    snippets={Object.values(GENERATE.snippets)}
                    codeBlockLabel="Generate"
                />
            </StepCard>

            <NotesCard notes={GENERATE.notes} />
        </section>
    );
}