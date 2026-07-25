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
import { syncPlaceholders } from "@/lib/api/placeholders";
import { toNormalizedRect, toAbsoluteRect } from "@/lib/helpers/dimensions-conversions";
import { usePlaceholders } from "@/hooks/use-placeholders";
import { handleApiError } from "@/lib/errors/handle-api-errors";
import { toast } from "sonner"

export default function Editor({ templateId }: { templateId: string; }) {
    const { data: template, isLoading } = useTemplate(templateId);
    const { data: loadedPlaceholders, isLoading: isPlaceholdersLoading } = usePlaceholders(templateId);

    const [placeholders, setPlaceholders] = useState<Placeholder[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    
    useEffect(() => {
        if (loadedPlaceholders) {
            if (!template || !loadedPlaceholders) return;

            const editorPlaceholders = loadedPlaceholders.map((p) => ({
                ...p,
                ...toAbsoluteRect(
                    p.x,
                    p.y,
                    p.width,
                    p.height,
                    template.width,
                    template.height
                ),
            }));

            setPlaceholders(editorPlaceholders);
        }
    }, [loadedPlaceholders]);

    if (isLoading) return <CanvasSkeleton />;
    if (!template) return null;

    function addPlaceholder(name: string, key: string) {
        if(!template) return;
        const placeholder: Placeholder = createPlaceholder(template.templateId, name, key);
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
            const updated: CreatePlaceholdersResponse = await syncPlaceholders(template.templateId, input);
            const editorPlaceholders = updated.map((p) => {
                const rect = toAbsoluteRect(
                    p.x,
                    p.y,
                    p.width,
                    p.height,
                    template.width,
                    template.height
                );

                return {
                    ...p,
                    ...rect,
                };
            });

            setPlaceholders(editorPlaceholders);
            toast.success("Placeholders saved successfully!");
        } catch(err) {
            handleApiError(err);
        } finally {
            setIsSaving(false);
        }
    }
    
    return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
        <div className="sticky top-0 z-20 shrink-0">
            <Toolbar
                onSave={savePlaceholders}
                isSaving={isSaving}
                templateName={template.name}
            />
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
            <aside className="h-full min-h-0 w-60 shrink-0 overflow-y-auto border-r bg-background p-4">
                <Layers
                    placeholders={placeholders}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    onAddPlaceholder={addPlaceholder}
                    onDeletePlaceholder={deletePlaceholder}
                />
            </aside>

            <main className="h-full min-h-0 min-w-0 flex-1 overflow-hidden [&>*]:h-full [&>*]:w-full">
                <Canvas
                    template={template}
                    placeholders={placeholders}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    onUpdatePlaceholder={updatePlaceholder}
                />
            </main>

            <aside className="h-full min-h-0 w-80 shrink-0 overflow-y-auto bg-background [&>*]:min-h-full [&>*]:w-full">
                <PropertiesPanel
                    placeholder={
                        placeholders.find(
                            (p) => p.id === selectedId
                        )
                    }
                    onUpdate={updatePlaceholder}
                />
            </aside>
        </div>
    </div>
);
}
