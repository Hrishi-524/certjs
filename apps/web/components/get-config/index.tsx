"use client";

import Hero from "./hero";
import WorkflowComparison from "./workflow-comparison";
import LocalSdkOverview from "./local-sdk-overview";
import NextSteps from "./next-steps";

export default function GetConfigPage() {
    return (
        <div className="space-y-16">
            <Hero />

            <WorkflowComparison />

            <LocalSdkOverview />

            <NextSteps />
        </div>
    );
}