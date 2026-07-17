import { Placeholder } from "@/types/placeholders.types";

export type LayersProps = {
    placeholders: Placeholder[];

    selectedId: string | null;

    onSelect: (id: string) => void;

    onDeletePlaceholder: (id: string) => void;

    onAddPlaceholder: (name: string, key: string) => void;
}