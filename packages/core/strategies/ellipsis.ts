import { LayoutResult } from "../types";
import measureTextWidth  from "../utils/measureWidth";

export default function ellipsisText(
    content: string,
    width: number,
    placeholderWidth: number,
    fontSize: number,
    family: string
):  LayoutResult {
    const maxWidth = width * placeholderWidth;

    if (measureTextWidth(content, fontSize, family) <= maxWidth) {
        return {
        lines: [content],
        fontSize
        };
    }

    let text = "";

    for (const char of content) {
        const testText = text + char;
        
        const testWidth = measureTextWidth(testText + "...", fontSize, family);

        if (testWidth > maxWidth) {
            return { lines: [text + "..."], fontSize };
        }

        text = testText;
    }

    return { lines: [text], fontSize };
}
