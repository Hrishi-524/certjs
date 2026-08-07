"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, WandSparkles } from "lucide-react";
import { useRouter } from "next/navigation";

type ToolbarProps = {
    onSave: () => void;
    isSaving: boolean;
    templateName: string;
    templateId: string;
};

function Toolbar({
    onSave,
    isSaving,
    templateName,
    templateId,
}: ToolbarProps) {
    const router = useRouter();

    return (
        <header className="flex h-14 items-center justify-between border-b bg-background px-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push("/dashboard/templates")}
                >
                    <ArrowLeft />
                    Back
                </Button>

                <h1 className="text-lg font-semibold">
                    {templateName}
                </h1>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    onClick={() => router.push(`/dashboard/playground/${templateId}`)}
                >
                    <WandSparkles />
                    Generate Certificates
                </Button>

                <Button
                    onClick={onSave}
                    disabled={isSaving}
                >
                    {isSaving ? "Saving..." : "Save"}
                </Button>
            </div>
        </header>
    );
}

export default Toolbar;
