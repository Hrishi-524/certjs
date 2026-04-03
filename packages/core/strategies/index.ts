import { LayoutResult } from "../types";
import shrinkToFit from "./shrink-to-fit";
import wrapText from "./warp-text";
import ellipsisText from "./ellipsis";

export function strategyFn(
    content: string,
    minFontSize: number | undefined,
    width: number,
    phWidth: number,
    fontSize: number,
    family: string,
    strategy: "shrink" | "ellipsis" | "wrap"
)   :  LayoutResult {
    switch (strategy) {
        case "shrink":
            return shrinkToFit(
                content,
                minFontSize,
                width,
                phWidth,
                fontSize,
                family
            );

        case "wrap":
            return wrapText(
                content,
                width,
                phWidth,
                fontSize,
                family
            );

        case "ellipsis":
            return ellipsisText(
                content,
                width,
                phWidth,
                fontSize,
                family
            );

        default:
            throw new Error(`Unknown strategy "${strategy}"`);
    }
}