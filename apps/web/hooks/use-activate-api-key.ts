import { useMutation, useQueryClient } from "@tanstack/react-query";

import { activateApiKey } from "@/lib/api/api-keys";
import { toast } from "sonner"

export function useActivateApiKey() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: activateApiKey,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["api-keys"],
            });
            toast.success("API key activated.");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
}