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
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Generate Certificates</CardTitle>
                <CardDescription>
                    Create a background batch job to generate certificates for all
                    valid recipients. You'll be redirected to the Jobs page where
                    you can monitor progress and download the generated ZIP.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="rounded-lg border bg-muted/40 p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                            Valid Recipients
                        </span>
                        <span className="font-semibold">
                            {recipientCount}
                        </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                            Certificates to Generate
                        </span>
                        <span className="font-semibold">
                            {recipientCount}
                        </span>
                    </div>
                </div>

                <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                    Batch generation runs asynchronously in the background. You
                    can safely leave this page after creating the job.
                </div>

                <Button
                    className="w-full"
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