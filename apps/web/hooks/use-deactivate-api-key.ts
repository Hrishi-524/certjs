import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deactivateApiKey } from "@/lib/api/api-keys";
import { toast } from "sonner";

export function useDeactivateApiKey() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deactivateApiKey,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["api-keys"],
            });
            toast.success("API key deactivated.");
        },

        onError: (error) => {
            toast.error(error.message);
        }
    });
}