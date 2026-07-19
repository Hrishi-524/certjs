import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

type AddPlaceholderDialogProps = {
    onCreate: (name: string, key: string) => void;
};

export function AddPlaceholderDialog({ onCreate }: AddPlaceholderDialogProps) {
    const [name, setName] = useState<string>("");
    const [key, setKey] = useState<string>("");
    const [open, setOpen] = useState(false);

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("Creating placeholder with name:", name, "and key:", key);

        if (!name.trim() || !key.trim()) {
            return;
        }

        onCreate(name.trim(), key.trim());

        setName("");
        setKey("");
        setOpen(false);
        return
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full justify-center">
                    Add placeholder
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit} className="space-y-5">
                        <DialogHeader>
                            <DialogTitle>
                                Add placeholder
                            </DialogTitle>
                            <DialogDescription className="leading-6">
                                Create a layer that can be positioned on the certificate canvas and mapped to incoming data.
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup className="gap-4">
                            <Field>
                                <Label htmlFor="name-1">Display name</Label>
                                <Input
                                    id="name-1"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Recipient name"
                                />
                                <FieldDescription>
                                    Shown in the Layers panel.
                                </FieldDescription>
                            </Field>
                            <Field>
                                <Label htmlFor="username-1">Data key</Label>
                                <Input
                                    id="username-1"
                                    name="key"
                                    value={key}
                                    onChange={(e) => setKey(e.target.value)}
                                    placeholder="recipient_name"
                                />
                                <FieldDescription>
                                    Use the matching column or field name when importing data.
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">
                                Add placeholder
                            </Button>
                        </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
