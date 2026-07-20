import { useQuery } from "@tanstack/react-query";
import { listTemplates } from "@/lib/api/templates";
import { ListTemplatesResponse } from "@/types/templates.types";

export function useTemplates() {
    return useQuery<ListTemplatesResponse>({
        queryKey: ["templates"],
        queryFn: listTemplates,
    });
}