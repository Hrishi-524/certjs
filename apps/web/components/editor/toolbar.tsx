"use client";

import { Button } from "@/components/ui/button";

type ToolbarProps = {
    onSave: () => void;
    isSaving: boolean;
    templateName: string;
};

function Toolbar({
    onSave,
    isSaving,
    templateName, 
}: ToolbarProps) {
    return (
        <header className="flex h-14 items-center justify-between border-b bg-background px-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                >
                    ← Back
                </Button>

                <h1 className="text-lg font-semibold">
                    Template Editor : {templateName}
                </h1>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    disabled
                >
                    Preview
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