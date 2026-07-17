import type { LayersProps } from "@/types/components/layers.types";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { AppIcon } from "../shared/app-icon";
import { Delete01Icon, Delete02Icon } from '@hugeicons/core-free-icons';
import { AddPlaceholderDialog } from "./add-placeholder-dialog";

function Layers({ placeholders, selectedId, onSelect, onDeletePlaceholder, onAddPlaceholder }: LayersProps) {
    return (
        <div className="space-y-2">
            {placeholders.map((placeholder) => (
                <div key={placeholder.id} onClick={() => onSelect(placeholder.id)} className={`flex items-center justify-between p-2 rounded cursor-pointer ${selectedId === placeholder.id ? "bg-blue-500/10" : ""}`}>
                    {placeholder.name}
                    <AppIcon icon={Delete01Icon} onClick={() => onDeletePlaceholder(placeholder.id)} />
                </div>
            ))}
            <Separator />
             <AddPlaceholderDialog
                onCreate={onAddPlaceholder}
            />

        </div>
    )
}

export default Layers