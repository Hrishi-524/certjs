// use-create-api-key.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createApiKey } from "@/lib/api/api-keys";

export function useCreateApiKey() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createApiKey,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["api-keys"],
            });
        },
    });
}