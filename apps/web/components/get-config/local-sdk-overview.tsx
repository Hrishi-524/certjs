import {
    CodeIcon,
    File02Icon,
    Shield01Icon,
} from "@hugeicons/core-free-icons";

import AppCodeBlock from "@/components/shared/app-code-block";
import { AppIcon } from "@/components/shared/app-icon";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const CONFIG = `{
  "template": "./certificate.png",
  "placeholders": [
    {
      "key": "recipient_name",
      "fontFamily": "Inter",
      "fontSize": 42,
      "fontColor": "#111827",
      "align": "center"
    }
  ]
}`;

const FEATURES = [
    {
        icon: Shield01Icon,
        title: "Privacy First",
        description:
            "Generate certificates within your own infrastructure without storing templates inside the hosted workspace.",
    },
    {
        icon: File02Icon,
        title: "Portable Configuration",
        description:
            "Export a certjs.config.json file containing placeholder positions, typography, alignment, and rendering configuration.",
    },
    {
        icon: CodeIcon,
        title: "Developer First",
        description:
            "Integrate certificate generation directly into your Node.js applications through the CertJS SDK.",
    },
];

export default function LocalSdkOverview() {
    return (
        <section className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Local SDK Overview
                </h2>

                <p className="max-w-3xl text-muted-foreground">
                    The standalone workflow extends the existing CertJS
                    editor by allowing templates to be exported as a
                    portable configuration instead of being stored in a
                    hosted workspace.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {FEATURES.map((feature) => (
                    <Card key={feature.title}>
                        <CardHeader>
                            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border bg-muted">
                                <AppIcon
                                    icon={feature.icon}
                                />
                            </div>

                            <CardTitle>
                                {feature.title}
                            </CardTitle>

                            <CardDescription>
                                {feature.description}
                            </CardDescription>
                        </CardHeader>

                        <CardContent />
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Example Configuration
                    </CardTitle>

                    <CardDescription>
                        The exported configuration describes how a
                        certificate should be rendered independently of
                        the dashboard.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <AppCodeBlock
                        language="json"
                        label="certjs.config.json"
                        code={CONFIG}
                    />
                </CardContent>
            </Card>
        </section>
    );
}