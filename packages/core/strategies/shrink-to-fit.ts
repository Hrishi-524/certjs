import { line } from "drizzle-orm/pg-core";
import type { LayoutResult } from "../types";
import measureWidth from "../utils/measureWidth";
import ellipsisText from "./ellipsis";

export default function shrikToFit(
    content: string, 
    min_font_size: number | undefined, 
    width: number, 
    ph_width: number, 
    font_size: number, 
    family: string
) : LayoutResult {
    const absWidth = Math.round(ph_width * width);
    
    const currentWidth = measureWidth(content, font_size, family);

    if(currentWidth <= absWidth) {
        return { lines: [content], font_size: font_size };
    }

    let new_font_size = font_size;
    while(new_font_size > (min_font_size ?? 10)) {
        new_font_size -= 2;
        const newWidth = measureWidth(content, new_font_size, family);
        if(newWidth <= absWidth) {
            return { lines: [content], font_size: new_font_size };
        }
    }

    const finalWidth = measureWidth(content, new_font_size, family);
    if(finalWidth > absWidth) {
        const ellipsisResult = ellipsisText(content, width, ph_width, new_font_size, family);
        console.warn(`Content "${content}" could not fit within the specified width even after shrinking. Applying ellipsis strategy as a fallback.`); 
        return ellipsisResult;
    }

    return { lines: [content], font_size: new_font_size ?? 10 };
}