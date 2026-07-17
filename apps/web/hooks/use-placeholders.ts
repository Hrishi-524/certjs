import { useQuery } from "@tanstack/react-query";
import { listPlaceholders } from "@/lib/api/placeholders";
import { GetTemplateResponse } from "@/types/templates.types";
import { toCanvasRect } from "@/lib/helpers/dimensions-conversions";
import { Placeholder } from "@/types/placeholders.types";

export function usePlaceholders(template: GetTemplateResponse | undefined) {
    return useQuery({
        queryKey: ["placeholders", template?.templateId],
        enabled: !!template,
        queryFn: async () => {
            if(!template) return []; // never executes because of enabled: !!template, but TypeScript needs this check
            const placeholders = await listPlaceholders(template.templateId);

            return placeholders.map((p) => {
                const rect = toCanvasRect(
                    p.x,
                    p.y,
                    p.width,
                    p.height,
                    template.width,
                    template.height
                );

                const resposne: Placeholder =  {
                    ...p,
                    ...rect,
                };

                return resposne;
            });
        },
        });
}