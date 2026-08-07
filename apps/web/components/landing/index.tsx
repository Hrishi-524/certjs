"use client";

import Hero from "./hero";
import PrimaryActions from "./primary-actions";
import WorkflowComparison from "./workflow-comparison";
import FeatureGrid from "./feature-grid";
import ArchitecturePreview from "./architecture-preview";
import Contribute from "./contribute";

export default function LandingPage() {
    return (
        <>
            <Hero />

            <PrimaryActions />

            <WorkflowComparison />

            <FeatureGrid />

            <ArchitecturePreview />

            <Contribute />
        </>
    );
}