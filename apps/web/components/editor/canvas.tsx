"use client";

import { Placeholder } from "@/types/placeholders.types";
import { GetTemplateResponse } from "@/types/templates.types";
import { UUID } from "crypto";
import PlaceholderComponent from "./placeholder";

export default function Canvas({ template, placeholders, selectedId, onSelect, onUpdatePlaceholder }: { template: GetTemplateResponse; placeholders: Placeholder[], selectedId: string | null, onSelect: (id: string) => void, onUpdatePlaceholder: (updated: Placeholder) => void }) {
    // Maximum canvas width shown in the editor
    const MAX_WIDTH = 1000;

    const scale = Math.min(MAX_WIDTH / template.width, 1);

    const canvasWidth = template.width * scale;
    const canvasHeight = template.height * scale;

    return (
        <div className="h-[calc(100vh-4rem)] overflow-auto bg-muted/30">
            <div className="flex justify-center p-8">
                <div
                    className="relative overflow-hidden rounded-lg border bg-background shadow-xl"
                    style={{
                        width: canvasWidth,
                        height: canvasHeight,
                    }}
                >
                    <img
                        src={template.presignedUrl}
                        alt={template.name}
                        draggable={false}
                        className="absolute inset-0 h-full w-full select-none object-contain"
                    />

                    {placeholders.map((placeholder) => (
                        <PlaceholderComponent
                            key={placeholder.id}
                            placeholder={placeholder}
                            scale={scale}
                            selected={placeholder.id === selectedId}
                            onSelect={() => onSelect(placeholder.id)}
                            onUpdate={onUpdatePlaceholder}
                        />
                    ))}
                    {/* <Placeholders scale={scale} /> */}
                </div>
            </div>
        </div>
    );
}