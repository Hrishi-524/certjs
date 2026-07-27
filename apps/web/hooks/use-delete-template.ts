import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";
import { deleteTemplate } from "@/lib/api/templates";

export function useDeleteTemplate() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTemplate,
        onSuccess:  () => queryClient.invalidateQueries({
            queryKey: ["templates"],
        })
    });
}