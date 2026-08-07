"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AppIcon } from "@/components/shared/app-icon";
import {
    Loading03Icon,
    TaskDone01Icon,
} from "@hugeicons/core-free-icons";

type GenerateCardProps = {
    recipientCount: number;
    isGenerating: boolean;
    onGenerate: () => void;
};

function GenerateCard({
    recipientCount,
    isGenerating,
    onGenerate,
}: GenerateCardProps) {
    return (
        <Card className="rounded-lg shadow-sm">
            <CardHeader className="border-b pb-4">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="mb-2 flex items-center gap-3">
                            <span className="flex size-7 shrink-0 items-center justify-center rounded-full border bg-primary text-xs font-semibold text-primary-foreground">
                                4
                            </span>
                            <CardTitle>Generate Certificates</CardTitle>
                        </div>
                        <CardDescription className="max-w-3xl">
                            Create a background batch job to generate certificates for all
                            valid recipients. You will be redirected to the Jobs page where
                            you can monitor progress and download the generated ZIP.
                        </CardDescription>
                    </div>
                    <span className="shrink-0 rounded-full border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        Step 4 / 4
                    </span>
                </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
                <div className="grid gap-3 rounded-md border bg-muted/30 p-3 sm:grid-cols-2">
                    <div>
                        <span className="text-xs font-medium uppercase text-muted-foreground">
                            Valid Recipients
                        </span>
                        <span className="mt-1 block text-xl font-semibold text-foreground">
                            {recipientCount}
                        </span>
                    </div>

                    <div>
                        <span className="text-xs font-medium uppercase text-muted-foreground">
                            Certificates to Generate
                        </span>
                        <span className="mt-1 block text-xl font-semibold text-foreground">
                            {recipientCount}
                        </span>
                    </div>
                </div>

                <div className="rounded-md border border-border bg-muted/20 px-3 py-2.5 text-sm text-muted-foreground">
                    Batch generation runs asynchronously in the background. You
                    can safely leave this page after creating the job.
                </div>

                <Button
                    className="h-10 w-full font-semibold"
                    size="lg"
                    disabled={isGenerating || recipientCount === 0}
                    onClick={onGenerate}
                >
                    <AppIcon
                        icon={isGenerating ? Loading03Icon : TaskDone01Icon}
                        className={isGenerating ? "mr-2 animate-spin" : "mr-2"}
                    />

                    {isGenerating
                        ? "Creating Batch Job..."
                        : "Generate Certificates"}
                </Button>
            </CardContent>
        </Card>
    );
}

export default GenerateCard;
