import { useMutation, useQueryClient } from "@tanstack/react-query";

import { activateApiKey } from "@/lib/api/api-keys";

export function useActivateApiKey() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: activateApiKey,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["api-keys"],
            });
        },
    });
}