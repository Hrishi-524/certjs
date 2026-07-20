import { useQuery } from "@tanstack/react-query";
import { getTemplate } from "@/lib/api/templates";
import { GetTemplateResponse } from "@/types/templates.types";

export function useTemplate(id: string) {
    return useQuery<GetTemplateResponse>({
        queryKey: ["template", id],
        queryFn: () => getTemplate(id),
    });
}