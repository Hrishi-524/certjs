"use client";

import { INITIALIZATION } from "@/components/data/documentation/sdk/initialization";

import AppLanguageTabs from "@/components/shared/app-language-tabs";
import ComparisonCard from "@/components/shared/comparison-card";
import GuideSection from "@/components/shared/guide-section";
import NotesCard from "@/components/shared/notes-card";
import StepCard from "@/components/shared/step-card";

export default function Initialization() {
    return (
        <section
            id="initialization"
            className="space-y-8"
        >
            <GuideSection
                title={INITIALIZATION.title}
                description={INITIALIZATION.description}
            />

            <StepCard
                step={1}
                title="Create a CertJS Client"
                description="Initialize the SDK with your API Key."
            >
                <AppLanguageTabs
                    snippets={Object.values(
                        INITIALIZATION.snippets
                    )}
                    codeBlockLabel="Initialize SDK"
                />
            </StepCard>

            <StepCard
                step={2}
                title="Choose a Template Source"
                description="CertJS supports two approaches depending on your workflow."
            >
                <ComparisonCard
                    left={{
                        title: "REST API",
                        description:
                            "Templates are managed in the CertJS Dashboard and referenced by Template ID.",
                        children: (
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p>• Upload your certificate.</p>
                                <p>• Edit placeholders visually.</p>
                                <p>• Save the template.</p>
                                <p>• Use the generated Template ID.</p>
                            </div>
                        ),
                    }}
                    right={{
                        title: "SDK",
                        description:
                            "Templates remain inside your project using local assets.",
                        children: (
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p>• Download <code>certjs.config.json</code>.</p>
                                <p>• Keep the PDF template locally.</p>
                                <p>• No Template ID required.</p>
                            </div>
                        ),
                    }}
                />
            </StepCard>

            <NotesCard
                title="Notes"
                notes={INITIALIZATION.notes}
            />
        </section>
    );
}