import type { LayersProps } from "@/types/components/layers.types";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { AppIcon } from "../shared/app-icon";
import { Delete01Icon } from '@hugeicons/core-free-icons';
import { AddPlaceholderDialog } from "./add-placeholder-dialog";

function Layers({ placeholders, selectedId, onSelect, onDeletePlaceholder, onAddPlaceholder }: LayersProps) {
    return (
        <div className="flex h-full min-h-0 flex-col gap-4">
            <div className="space-y-3">
                <div className="space-y-1">
                    <h2 className="text-sm font-semibold tracking-wide text-foreground">
                        Layers
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        Manage certificate placeholders
                    </p>
                </div>

                <AddPlaceholderDialog
                    onCreate={onAddPlaceholder}
                />
            </div>

            <Separator />

            <div className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
                {placeholders.length > 0 ? (
                    placeholders.map((placeholder) => {
                        const isSelected = selectedId === placeholder.id;

                        return (
                            <div
                                key={placeholder.id}
                                onClick={() => onSelect(placeholder.id)}
                                className={`group flex cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-2 text-sm transition-colors ${
                                    isSelected
                                        ? "border-primary/30 bg-primary/10 text-foreground shadow-sm"
                                        : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/70 hover:text-foreground"
                                }`}
                            >
                                <div className={`flex size-7 shrink-0 items-center justify-center rounded-md border text-xs font-medium ${
                                    isSelected
                                        ? "border-primary/30 bg-background text-primary"
                                        : "border-border bg-background text-muted-foreground"
                                }`}>
                                    {placeholder.name.trim().charAt(0).toUpperCase() || "P"}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="truncate font-medium">
                                        {placeholder.name}
                                    </div>
                                    <div className="truncate text-xs text-muted-foreground">
                                        {placeholder.key}
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    className="size-7 shrink-0 text-muted-foreground opacity-70 hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                                    aria-label={`Delete ${placeholder.name}`}
                                    onClick={() => onDeletePlaceholder(placeholder.id)}
                                >
                                    <AppIcon icon={Delete01Icon} size={16} />
                                </Button>
                            </div>
                        );
                    })
                ) : (
                    <div className="rounded-lg border border-dashed bg-muted/30 px-3 py-6 text-center">
                        <div className="text-sm font-medium text-foreground">
                            No layers yet
                        </div>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            Add a placeholder to start placing editable fields on the canvas.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Layers
