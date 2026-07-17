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
import { Field, FieldGroup } from "@/components/ui/field"
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
                <Button>+ Add placeholder</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>Add Placeholder</DialogTitle>
                            <DialogDescription>
                                The key is unique identefier for placeholder. If you have data, name it exactly as the column name for easy integration.
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="name-1">Name</Label>
                                <Input id="name-1" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </Field>
                            <Field>
                                <Label htmlFor="username-1">Key</Label>
                                <Input id="username-1" name="key" value={key} onChange={(e) => setKey(e.target.value)} />
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">
                                Save changes
                            </Button>
                        </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
