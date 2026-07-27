// use-api-keys.ts

import { useQuery } from "@tanstack/react-query";

import { listApiKeys } from "@/lib/api/api-keys";
import { ListApiKeysResponse } from "@/types/api-keys.types";

export function useApiKeys() {
    return useQuery<ListApiKeysResponse>({
        queryKey: ["api-keys"],
        queryFn: listApiKeys,
    });
}