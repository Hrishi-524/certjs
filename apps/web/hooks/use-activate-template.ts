import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateTemplate } from "@/lib/api/templates";
import { toast } from "sonner"

export function useActivateTemplate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: activateTemplate,

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