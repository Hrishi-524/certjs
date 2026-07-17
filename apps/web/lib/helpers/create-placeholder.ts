import { Placeholder } from "@/types/placeholders.types";
import { GetTemplateResponse } from "@/types/templates.types";

export default function createPlaceholder( templateId: string, name: string, key: string ): Placeholder {
    return {
        id: crypto.randomUUID(),
        templateId,
        name: name,
        key,
        x: 0.5,
        y: 0.5,
        width: 300,
        height: 60,
        fontSize: 42,
        minFontSize: 18,
        fontColor: "#000000",
        fontFamily: "Arial",
        align: "center",
        strategy: "shrink",
    };
}