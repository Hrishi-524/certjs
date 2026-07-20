import { useQuery } from "@tanstack/react-query";
import { listPlaceholders } from "@/lib/api/placeholders";
import { ListPlaceholdersResponse, Placeholder } from "@/types/placeholders.types";

export function usePlaceholders(templateId?: string) {
    return useQuery<ListPlaceholdersResponse>({
        queryKey: ["placeholders", templateId],
        enabled: !!templateId,
        queryFn: () => listPlaceholders(templateId!),
    });
}