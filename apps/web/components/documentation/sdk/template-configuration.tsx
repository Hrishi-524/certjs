"use client";

import { TEMPLATES } from "@/components/data/documentation/sdk/template-configuration";

import AppLanguageTabs from "@/components/shared/app-language-tabs";
import ComparisonCard from "@/components/shared/comparison-card";
import GuideSection from "@/components/shared/guide-section";
import NotesCard from "@/components/shared/notes-card";
import StepCard from "@/components/shared/step-card";

export default function TemplateConfiguration() {
    return (
        <section
            id="template-configuration"
            className="space-y-8"
        >
            <GuideSection
                title={TEMPLATES.title}
                description={TEMPLATES.description}
            />

            <ComparisonCard
                left={{
                    title: "Dashboard Templates",
                    description:
                        "Templates are uploaded and managed through the CertJS Dashboard.",
                    children: (
                        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                            <li>Upload your certificate.</li>
                            <li>Edit placeholders visually.</li>
                            <li>Save the template.</li>
                            <li>Reference it using a Template ID.</li>
                        </ul>
                    ),
                }}
                right={{
                    title: "Local Templates",
                    description:
                        "Templates remain inside your application repository.",
                    children: (
                        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                            <li>Download <code>certjs.config.json</code>.</li>
                            <li>Store the PDF template locally.</li>
                            <li>No Template ID required.</li>
                            <li>Ideal for privacy-sensitive deployments.</li>
                        </ul>
                    ),
                }}
            />

            <StepCard
                step={1}
                title="Configure Template"
                description="Initialize the SDK using either workflow."
            >
                <AppLanguageTabs
                    snippets={Object.values(TEMPLATES.snippets)}
                    codeBlockLabel="Template Configuration"
                />
            </StepCard>

            <NotesCard
                title="Notes"
                notes={TEMPLATES.notes}
            />
        </section>
    );
}
