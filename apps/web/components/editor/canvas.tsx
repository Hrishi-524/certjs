"use client";

import { Placeholder } from "@/types/placeholders.types";
import { GetTemplateResponse } from "@/types/templates.types";
import PlaceholderComponent from "./placeholder";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Canvas({ template, placeholders, selectedId, onSelect, onUpdatePlaceholder }: { template: GetTemplateResponse; placeholders: Placeholder[], selectedId: string | null, onSelect: (id: string) => void, onUpdatePlaceholder: (updated: Placeholder) => void }) {
    const viewportRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);


    useLayoutEffect(() => {
        if (!viewportRef.current) return;

        const updateScale = () => {
            if (!viewportRef.current) return;
            const availableWidth = viewportRef.current.clientWidth;
            const nextScale = Math.min(availableWidth / template.width,1);
            setScale(nextScale);
        };

        updateScale();
        const observer = new ResizeObserver(updateScale);
        observer.observe(viewportRef.current);
        return () => observer.disconnect();
    }, [template.width]);

    return (
        <div ref={viewportRef} className="h-full overflow-auto bg-muted/30">
            <div className="flex min-h-full items-start justify-center">
                <div
                    className="relative overflow-hidden rounded-lg border bg-background shadow-xl"
                    style={{
                        width: template.width * scale,
                        height: template.height * scale,
                    }}
                >
                    <img

                        src={template.presignedUrl}
                        alt={template.name}
                        draggable={false}
                        className="absolute inset-0 h-full w-full select-none"
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
                </div>
            </div>
        </div>
    );
}