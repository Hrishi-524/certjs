import { LayoutResult } from "../types";
import measureTextWidth  from "../utils/measureWidth";

export default function ellipsisText(
    content: string,
    width: number,
    ph_width: number,
    fontSize: number,
    family: string
):  LayoutResult {
    const maxWidth = width * ph_width;

    if (measureTextWidth(content, fontSize, family) <= maxWidth) {
        return {
        lines: [content],
        font_size: fontSize
        };
    }

    let text = "";

    for (const char of content) {
        const testText = text + char;
        
        const testWidth = measureTextWidth(testText + "...", fontSize, family);

        if (testWidth > maxWidth) {
            return { lines: [text + "..."], font_size: fontSize };
        }

        text = testText;
    }

    return { lines: [text], font_size: fontSize };
}