import { LayoutResult } from "../types";
import measureWidth from "../utils/measureWidth";
import ellipsisText from "./ellipsis";

export default function warpText(
    content: string, 
    width: number, 
    ph_width: number, 
    fontSize: number, 
    family: string
): LayoutResult {
    const maxWidth = width * ph_width;
    const words = content.split(" ");

    const lines : string[] = [];
    let currentLine = "";

    for(const word of words) {
        const testLine = currentLine ? currentLine + " " + word : word;
        
        const testWidth = measureWidth(testLine, fontSize, family);
        
        if(testWidth <= maxWidth) {
            currentLine = testLine;
        } else {
            if(measureWidth(word, fontSize, family) > maxWidth) {
                if(currentLine) {
                    lines.push(currentLine);
                    currentLine = ""
                }
                // Use ellipsis strategy for the long word
                const ellipsisResult = ellipsisText(word, width, ph_width, fontSize, family);
                lines.push(...ellipsisResult.lines);
                continue;
            }
            if(currentLine) {
                lines.push(currentLine);
            }
            currentLine = word;
        }
    }

    if(currentLine) {
        lines.push(currentLine);
    }

    return { lines: lines, font_size: fontSize };
}