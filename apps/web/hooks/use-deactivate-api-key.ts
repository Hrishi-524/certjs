import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deactivateApiKey } from "@/lib/api/api-keys";

export function useDeactivateApiKey() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deactivateApiKey,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["api-keys"],
            });
        },
    });
}