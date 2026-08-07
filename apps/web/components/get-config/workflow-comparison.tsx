import {
    CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";

import ComparisonCard from "@/components/shared/comparison-card";
import { AppIcon } from "@/components/shared/app-icon";

const dashboardWorkflow = [
    "Visual template editor",
    "Template management",
    "Cloud workspace",
    "Batch certificate generation",
    "REST API integration",
];

const localWorkflow = [
    "Portable certjs.config.json",
    "Generate certificates locally",
    "Templates stay on your machine",
    "Reuse existing editor workflow",
    "JavaScript SDK integration",
];

export default function WorkflowComparison() {
    return (
        <section className="space-y-4">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Two Workflows, One Rendering Engine
                </h2>

                <p className="max-w-3xl text-muted-foreground">
                    The hosted dashboard and the upcoming local workflow
                    share the same rendering model. The difference is where
                    templates are managed and certificates are generated.
                </p>
            </div>

            <ComparisonCard
                left={{
                    title: "Dashboard Workflow",

                    description:
                        "Best for teams managing templates through the hosted workspace.",

                    children: (
                        <ul className="space-y-3">
                            {dashboardWorkflow.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-3"
                                >
                                    <AppIcon
                                        icon={CheckmarkCircle02Icon}
                                        className="text-primary"
                                    />

                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    ),
                }}
                right={{
                    title: "Local SDK Workflow",

                    description:
                        "Ideal for organizations requiring complete ownership of templates and certificate generation.",

                    children: (
                        <ul className="space-y-3">
                            {localWorkflow.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-3"
                                >
                                    <AppIcon
                                        icon={CheckmarkCircle02Icon}
                                        className="text-primary"
                                    />

                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    ),

                    footer: (
                        <p className="text-sm text-muted-foreground">
                            The local workflow exports a portable
                            <span className="font-medium">
                                {" "}certjs.config.json{" "}
                            </span>
                            file that can be used directly by the CertJS SDK.
                        </p>
                    ),
                }}
            />
        </section>
    );
}