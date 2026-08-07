import Link from "next/link";

import {
    ArrowRight01Icon,
    InformationCircleIcon,
} from "@hugeicons/core-free-icons";

import { AppIcon } from "@/components/shared/app-icon";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function NextSteps() {
    return (
        <section className="space-y-6">
            <div className="space-y-2">
                <Badge>
                    Coming Soon
                </Badge>

                <h2 className="text-2xl font-semibold tracking-tight">
                    What's Next
                </h2>

                <p className="max-w-3xl text-muted-foreground">
                    The standalone workflow is currently under active
                    development. It will reuse the existing template
                    editor while allowing developers to export portable
                    configuration files for local certificate generation.
                </p>
            </div>

            <Alert>
                <AppIcon icon={InformationCircleIcon} />

                <AlertTitle>
                    Planned Workflow
                </AlertTitle>

                <AlertDescription className="space-y-4">
                    <p>
                        Design your certificate visually, export a
                        <strong> certjs.config.json </strong>
                        file, and generate certificates locally using
                        the CertJS SDK.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <Button
                            variant="outline"
                            asChild
                        >
                            <Link href="/docs">
                                SDK Documentation
                                <AppIcon icon={ArrowRight01Icon} />
                            </Link>
                        </Button>

                        <Button
                            asChild
                        >
                            <Link href="https://github.com/hrishi-patil/certjs">
                                GitHub
                                <AppIcon icon={ArrowRight01Icon} />
                            </Link>
                        </Button>
                    </div>
                </AlertDescription>
            </Alert>
        </section>
    );
}