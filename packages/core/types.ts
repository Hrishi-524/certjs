export interface Placeholder {
    id: string;
    template_id: string;

    name: string;
    key: string;

    x: number;      
    y: number;
    width: number;
    height: number;

    strategy: "shrink" | "ellipsis" | "wrap";

    min_font_size?: number;

    align: "left" | "center" | "right";

    font_size: number;
    font_color: string;
    font_family: string;
}

export interface RenderInput {
    templateBuffer: Buffer;
    placeholders: Placeholder[];
    data: Record<string, string>;
}

export interface LayoutResult {
    lines: string[]; 
    font_size: number;
};

export interface DebugOptions {
    enabled?: boolean;
    showBoxes?: boolean;
    showCenters?: boolean;
    showBaselines?: boolean;
}