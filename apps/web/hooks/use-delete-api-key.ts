import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteApiKey } from "@/lib/api/api-keys";

export function useDeleteApiKey() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteApiKey,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["api-keys"],
            });
        },
    });
}