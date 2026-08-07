import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteApiKey } from "@/lib/api/api-keys";
import { toast } from "sonner"

export function useDeleteApiKey() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteApiKey,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["api-keys"],
            });
            toast.success("API key deleted.");
        },

        onError: (error) => {
            toast.error(error.message);
        }
    });
}