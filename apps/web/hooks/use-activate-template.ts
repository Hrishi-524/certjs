import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateTemplate } from "@/lib/api/templates";

export function useActivateTemplate() {
    return useMutation({
        mutationFn: activateTemplate,
    })
}