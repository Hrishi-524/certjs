import type { InferSelectModel } from "drizzle-orm";
import { placeholders } from "@certjs/db/schema/placeholders";

export type Placeholder = InferSelectModel<typeof placeholders>;

export interface RenderInput {
    templateBuffer: Buffer;
    placeholders: Placeholder[];
    data: Record<string, string | number>;
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