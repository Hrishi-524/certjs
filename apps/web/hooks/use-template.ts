import { useQuery } from "@tanstack/react-query";
import { getTemplate } from "@/lib/api/templates";

export function useTemplate(id: string) {
    return useQuery({
        queryKey: ["template", id],
        queryFn: () => getTemplate(id),
    });
}