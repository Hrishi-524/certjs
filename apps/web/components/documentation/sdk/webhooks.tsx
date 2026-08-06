"use client";

import { WEBHOOKS } from "@/components/data/documentation/sdk/webhooks";

import AppLanguageTabs from "@/components/shared/app-language-tabs";
import GuideSection from "@/components/shared/guide-section";
import NotesCard from "@/components/shared/notes-card";
import StepCard from "@/components/shared/step-card";

export default function Webhooks() {
    return (
        <section
            id="webhooks"
            className="space-y-8"
        >
            <GuideSection
                title={WEBHOOKS.title}
                description={WEBHOOKS.description}
            />

            <StepCard
                step={1}
                title="Register a Webhook"
                description="Create an endpoint capable of receiving CertJS events."
            >
                <AppLanguageTabs
                    snippets={Object.values(WEBHOOKS.snippets)}
                    codeBlockLabel="Webhook Example"
                />
            </StepCard>

            <NotesCard notes={WEBHOOKS.notes} />
        </section>
    );
}