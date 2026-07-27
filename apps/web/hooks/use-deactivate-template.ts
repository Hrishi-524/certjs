import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateTemplate } from "@/lib/api/templates";

export function useDeactivateTemplate() {
    return useMutation({
        mutationFn: deactivateTemplate,
    })
}