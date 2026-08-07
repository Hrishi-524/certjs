"use client";

import { Rnd } from "react-rnd";
import { Placeholder } from "@/types/placeholders.types";

const justifyClassByAlign: Record<Placeholder["align"], string> = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
};

export default function PlaceholderComponent({
    placeholder,
    scale,
    selected,
    onSelect,
    onUpdate,
}: {
    placeholder: Placeholder;
    scale: number;
    selected: boolean;
    onSelect: () => void;
    onUpdate: (updatedPlaceholder: Placeholder) => void;
}) {
    return (
        <Rnd
            bounds="parent"
            position={{
                x: placeholder.x * scale,
                y: placeholder.y * scale,
            }}
            size={{
                width: placeholder.width * scale,
                height: placeholder.height * scale,
            }}
            onClick={onSelect}
            onDragStop={(e, d) => {
                onUpdate({
                    ...placeholder,
                    x: d.x / scale,
                    y: d.y / scale,
                });
            }}
            onResizeStop={(e, dir, ref, delta, position) => {
                onUpdate({
                    ...placeholder,
                    x: position.x / scale,
                    y: position.y / scale,
                    width: ref.offsetWidth / scale,
                    height: ref.offsetHeight / scale,
                });
            }}
        >
            <div
                className={`
                    h-full
                    w-full
                    rounded
                    border-2
                    ${
                        selected
                            ? "border-blue-500"
                            : "border-gray-400"
                    }
                    bg-blue-500/10
                    flex
                    items-center
                    ${justifyClassByAlign[placeholder.align]}
                    overflow-hidden
                    px-1
                `}
                style={{
                    color: placeholder.fontColor,
                    fontFamily: placeholder.fontFamily,
                    fontSize: placeholder.fontSize * scale,
                    lineHeight: 1.2,
                    textAlign: placeholder.align,
                }}
            >
                {placeholder.name}
            </div>
        </Rnd>
    );
}
