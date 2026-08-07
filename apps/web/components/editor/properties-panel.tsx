import { editorFontOptions } from "@/components/data/editor/fonts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Placeholder } from "@/types/placeholders.types";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import React from "react";

type PanelProps = {
    placeholder: Placeholder | undefined;
    onUpdate: (updated: Placeholder) => void;
};

const strategies: Array<Placeholder["strategy"]> = ["shrink", "ellipsis", "wrap"];
const alignments: Array<Placeholder["align"]> = ["left", "center", "right"];

function toPositiveInteger(value: string, fallback: number) {
    const next = Number.parseInt(value, 10);
    return Number.isFinite(next) && next > 0 ? next : fallback;
}

function isHexColor(value: string) {
    return /^#[0-9a-fA-F]{6}$/.test(value);
}

function PropertiesPanel({ placeholder, onUpdate }: PanelProps) {
    function updateFontSize(value: string) {
        if (!placeholder) return;

        const fontSize = toPositiveInteger(value, placeholder.fontSize);
        const minFontSize = placeholder.minFontSize === null
            ? null
            : Math.min(placeholder.minFontSize, fontSize);

        onUpdate({ ...placeholder, fontSize, minFontSize });
    }

    function updateMinFontSize(value: string) {
        if (!placeholder) return;

        onUpdate({
            ...placeholder,
            minFontSize: value === ""
                ? null
                : Math.min(toPositiveInteger(value, placeholder.minFontSize ?? 18), placeholder.fontSize),
        });
    }

    return (
        <div className="w-full border-l bg-background p-4">
            <h2 className="mb-4 text-lg font-semibold">Properties</h2>

            {placeholder ? (
                <div className="space-y-5">
                    <section className="space-y-3">
                        <h3 className="text-sm font-semibold text-foreground">Placeholder</h3>

                        <div className="space-y-1.5">
                            <Label htmlFor="placeholder-name">Name</Label>
                            <Input
                                id="placeholder-name"
                                type="text"
                                value={placeholder.name}
                                onChange={(e) => onUpdate({ ...placeholder, name: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="placeholder-key">Key</Label>
                            <Input
                                id="placeholder-key"
                                type="text"
                                value={placeholder.key}
                                onChange={(e) => onUpdate({ ...placeholder, key: e.target.value })}
                            />
                        </div>
                    </section>

                    <Separator />

                    <section className="space-y-3">
                        <h3 className="text-sm font-semibold text-foreground">Typography</h3>

                        <div className="space-y-1.5">
                            <Label>Font</Label>
                            <Select
                                value={placeholder.fontFamily}
                                onValueChange={(fontFamily) => onUpdate({ ...placeholder, fontFamily })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select font" />
                                </SelectTrigger>
                                <SelectContent>
                                    {editorFontOptions.map((font) => (
                                        <SelectItem key={font} value={font}>
                                            {font}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="placeholder-font-size">Size</Label>
                            <Input
                                id="placeholder-font-size"
                                type="number"
                                min={1}
                                value={placeholder.fontSize}
                                onChange={(e) => updateFontSize(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="placeholder-font-color">Color</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="placeholder-font-color"
                                    type="color"
                                    value={isHexColor(placeholder.fontColor) ? placeholder.fontColor : "#000000"}
                                    onChange={(e) => onUpdate({ ...placeholder, fontColor: e.target.value })}
                                    className="w-12 px-1"
                                />
                                <Input
                                    type="text"
                                    value={placeholder.fontColor}
                                    onChange={(e) => onUpdate({ ...placeholder, fontColor: e.target.value })}
                                    className="font-mono"
                                />
                            </div>
                        </div>
                    </section>

                    <Separator />

                    <section className="space-y-3">
                        <h3 className="text-sm font-semibold text-foreground">Layout</h3>

                        <div className="space-y-1.5">
                            <Label>Alignment</Label>
                            <div className="grid grid-cols-3 gap-2">
                                {alignments.map((align) => {
                                    const Icon = align === "left"
                                        ? AlignLeft
                                        : align === "center"
                                            ? AlignCenter
                                            : AlignRight;

                                    return (
                                        <Button
                                            key={align}
                                            type="button"
                                            variant={placeholder.align === align ? "default" : "outline"}
                                            size="icon"
                                            aria-label={`Align ${align}`}
                                            onClick={() => onUpdate({ ...placeholder, align })}
                                            className="w-full"
                                        >
                                            <Icon />
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label>Strategy</Label>
                            <Select
                                value={placeholder.strategy}
                                onValueChange={(strategy: Placeholder["strategy"]) => onUpdate({ ...placeholder, strategy })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select strategy" />
                                </SelectTrigger>
                                <SelectContent>
                                    {strategies.map((strategy) => (
                                        <SelectItem key={strategy} value={strategy}>
                                            {strategy.charAt(0).toUpperCase() + strategy.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="placeholder-min-font-size">Min Font Size</Label>
                            <Input
                                id="placeholder-min-font-size"
                                type="number"
                                min={1}
                                max={placeholder.fontSize}
                                value={placeholder.minFontSize ?? ""}
                                onChange={(e) => updateMinFontSize(e.target.value)}
                            />
                        </div>
                    </section>

                    <Separator />

                    <section className="space-y-3">
                        <h3 className="text-sm font-semibold text-foreground">Position</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1.5">
                                <Label htmlFor="placeholder-x" className="text-xs text-muted-foreground">X</Label>
                                <Input
                                    id="placeholder-x"
                                    type="number"
                                    value={placeholder.x}
                                    onChange={(e) => onUpdate({ ...placeholder, x: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="placeholder-y" className="text-xs text-muted-foreground">Y</Label>
                                <Input
                                    id="placeholder-y"
                                    type="number"
                                    value={placeholder.y}
                                    onChange={(e) => onUpdate({ ...placeholder, y: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="placeholder-width" className="text-xs text-muted-foreground">Width</Label>
                                <Input
                                    id="placeholder-width"
                                    type="number"
                                    value={placeholder.width}
                                    onChange={(e) => onUpdate({ ...placeholder, width: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="placeholder-height" className="text-xs text-muted-foreground">Height</Label>
                                <Input
                                    id="placeholder-height"
                                    type="number"
                                    value={placeholder.height}
                                    onChange={(e) => onUpdate({ ...placeholder, height: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>
                    </section>
                </div>
            ) : (
                <p className="text-sm text-muted-foreground">Select a placeholder to edit its properties.</p>
            )}
        </div>
    );
}

export default PropertiesPanel;
