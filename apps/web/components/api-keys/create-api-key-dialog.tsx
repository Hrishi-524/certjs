"use client";

import { useState } from "react";

import { Key01Icon } from "@hugeicons/core-free-icons";

import { AppIcon } from "@/components/shared/app-icon";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    CreateApiKeyInput,
    CreateApiKeyResponse,
} from "@/types/api-keys.types";

type CreateApiKeyDialogProps = {
    open: boolean;
    creating?: boolean;

    onOpenChange: (open: boolean) => void;

    onCreate: (
        input: CreateApiKeyInput
    ) => Promise<CreateApiKeyResponse>;
};

export default function CreateApiKeyDialog({
    open,
    creating = false,
    onOpenChange,
    onCreate,
}: CreateApiKeyDialogProps) {
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");

    function resetForm() {
        setName("");
        setExpiry("");
    }

    async function handleGenerate() {
        const response = await onCreate({
            name,
            expiry: expiry || null,
        });

        resetForm();

        onOpenChange(false);

        // return the response to the caller
        return response;
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                if (creating) return;

                if (!nextOpen) {
                    resetForm();
                }

                onOpenChange(nextOpen);
            }}
        >
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        Generate API Key
                    </DialogTitle>

                    <DialogDescription>
                        Create a new API key to authenticate requests to the
                        CertJS API.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 py-2">
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Name
                        </Label>

                        <Input
                            id="name"
                            placeholder="Production"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="expiry">
                            Expiry (optional)
                        </Label>

                        <Input
                            id="expiry"
                            type="datetime-local"
                            value={expiry}
                            onChange={(e) =>
                                setExpiry(e.target.value)
                            }
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        disabled={creating}
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        disabled={!name.trim() || creating}
                        onClick={handleGenerate}
                    >
                        <AppIcon icon={Key01Icon} />

                        {creating
                            ? "Generating..."
                            : "Generate"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}