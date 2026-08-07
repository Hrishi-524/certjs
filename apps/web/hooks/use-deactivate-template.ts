import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateTemplate } from "@/lib/api/templates";
import { toast } from "sonner"

export function useDeactivateTemplate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deactivateTemplate,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["templates"],
            });
            toast.success("Template activated.");
        },

        onError: (error) => {
            toast.error(error.message);
        }
    });
}