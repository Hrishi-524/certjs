"use client";

import { WORKFLOW } from "@/components/data/landing/workflow";

import ComparisonCard from "@/components/shared/comparison-card";
import StepCard from "@/components/shared/step-card";
import WorkflowSteps from "../shared/workflow-steps";

export default function WorkflowComparison() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-20">
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold">
                    {WORKFLOW.title}
                </h2>

                <p className="mt-3 text-muted-foreground">
                    {WORKFLOW.description}
                </p>
            </div>

            <ComparisonCard
                left={{
                    title: WORKFLOW.dashboard.title,
                    description: WORKFLOW.dashboard.description,
                    children: (
                        <WorkflowSteps
                            steps={WORKFLOW.dashboard.steps}
                        />
                    ),
                }}
                right={{
                    title: WORKFLOW.local.title,
                    description: WORKFLOW.local.description,
                    children: (
                        <WorkflowSteps
                            steps={WORKFLOW.local.steps}
                        />
                    ),
                }}
            />
        </section>
    );
}