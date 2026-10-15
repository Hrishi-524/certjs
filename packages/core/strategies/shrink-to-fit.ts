import type { LayoutResult } from "../types";
import measureWidth from "../utils/measureWidth";
import ellipsisText from "./ellipsis";

export default function shrinkToFit(
    content: string, 
    minFontSize: number | undefined, 
    width: number, 
    placeholderWidth: number, 
    fontSize: number, 
    family: string
) : LayoutResult {
    const absWidth = Math.round(placeholderWidth * width);
    
    const currentWidth = measureWidth(content, fontSize, family);

    if(currentWidth <= absWidth) {
        return { lines: [content], fontSize };
    }

    let newFontSize = fontSize;
    while(newFontSize > (minFontSize ?? 10)) {
        newFontSize -= 2;
        const newWidth = measureWidth(content, newFontSize, family);
        if(newWidth <= absWidth) {
            return { lines: [content], fontSize: newFontSize };
        }
    }

    const finalWidth = measureWidth(content, newFontSize, family);
    if(finalWidth > absWidth) {
        const ellipsisResult = ellipsisText(content, width, placeholderWidth, newFontSize, family);
        console.warn(`Content "${content}" could not fit within the specified width even after shrinking. Applying ellipsis strategy as a fallback.`); 
        return ellipsisResult;
    }

    return { lines: [content], fontSize: newFontSize ?? 10 };
}
