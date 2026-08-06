"use client";

import { VERIFICATION } from "@/components/data/documentation/sdk/verification";

import AppLanguageTabs from "@/components/shared/app-language-tabs";
import GuideSection from "@/components/shared/guide-section";
import NotesCard from "@/components/shared/notes-card";
import StepCard from "@/components/shared/step-card";

export default function Verification() {
    return (
        <section
            id="verification"
            className="space-y-8"
        >
            <GuideSection
                title={VERIFICATION.title}
                description={VERIFICATION.description}
            />

            <StepCard
                step={1}
                title="Verify Certificate"
                description="Use a verification token to retrieve certificate metadata."
            >
                <AppLanguageTabs
                    snippets={Object.values(VERIFICATION.snippets)}
                    codeBlockLabel="Verify"
                />
            </StepCard>

            <NotesCard notes={VERIFICATION.notes} />
        </section>
    );
}