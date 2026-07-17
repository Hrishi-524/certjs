"use client";

import { useEffect, useState } from "react";
import { useTemplate } from "@/hooks/use-template";
import { CreatePlaceholdersInput, CreatePlaceholdersResponse, Placeholder } from "@/types/placeholders.types";
import Canvas from "@/components/editor/canvas";
import CanvasSkeleton from "@/components/editor/canvas-skeleton";
import createPlaceholder from "@/lib/helpers/create-placeholder";
import Layers from "@/components/editor/layers";
import PropertiesPanel from "@/components/editor/properties-panel";
import Toolbar from "./toolbar";
import { createPlaceholders } from "@/lib/api/placeholders";
import { toNormalizedRect } from "@/lib/helpers/dimensions-conversions";
import { usePlaceholders } from "@/hooks/use-placeholders";

export default function Editor({ templateId }: { templateId: string; }) {
    const { data: template, isLoading } = useTemplate(templateId);
    const { data: loadedPlaceholders, isLoading: isPlaceholdersLoading } = usePlaceholders(template);

    const [placeholders, setPlaceholders] = useState<Placeholder[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    
    useEffect(() => {
        if (loadedPlaceholders) {
            setPlaceholders(loadedPlaceholders);
        }
    }, [loadedPlaceholders]);

    if (isLoading) return <CanvasSkeleton />;
    if (!template) return null;

    function addPlaceholder(name: string, key: string) {
        if(!template) return;
        const placeholder: Placeholder = createPlaceholder(template.templateId, name, key);
        console.log("Adding placeholder:", placeholder);
        setPlaceholders((prev) => [...prev, placeholder]);
    }

    function updatePlaceholder( updated: Placeholder ) {
        setPlaceholders((prev) => prev.map((placeholder) =>
            placeholder.id === updated.id ? updated : placeholder
        ));
    }

    function deletePlaceholder(id: string) {
        setPlaceholders(prev =>
            prev.filter(p => p.id !== id)
        );

        if (selectedId === id) setSelectedId(null);
    }

    async function savePlaceholders() {
        if(!template) return;

        setIsSaving(true);

        

        const input: CreatePlaceholdersInput = placeholders.map(p => {
            const rect = toNormalizedRect(
                p.x,
                p.y,
                p.width,
                p.height,
                template.width,
                template.height
            );
            return {
            name: p.name,
            key: p.key,
            ...rect,
            fontSize: p.fontSize,
            fontColor: p.fontColor,
            fontFamily: p.fontFamily,
            strategy: p.strategy,
            align: p.align,
            minFontSize: p.minFontSize ?? undefined,
        }});

        try {
            console.log("Saving placeholders:", input);
            const response: CreatePlaceholdersResponse = await createPlaceholders(template.templateId, input);
            console.log("Placeholders saved:", response);
        } finally {
            setIsSaving(false);
        }
    }
    
    return (
    <div className="flex h-screen flex-col">
        <Toolbar
            onSave={savePlaceholders}
            isSaving={isSaving}
            templateName={template.name}
        />

        <div className="flex flex-1 overflow-hidden">
            <Layers
                placeholders={placeholders}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onAddPlaceholder={addPlaceholder}
                onDeletePlaceholder={deletePlaceholder}
            />

            <Canvas
                template={template}
                placeholders={placeholders}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onUpdatePlaceholder={updatePlaceholder}
            />

            <PropertiesPanel
                placeholder={
                    placeholders.find(
                        (p) => p.id === selectedId
                    )
                }
                onUpdate={updatePlaceholder}
            />
        </div>
    </div>
);
}