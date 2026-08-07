import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { logout } from "@/lib/api/auth";
import { clearAccessToken } from "@/lib/auth/token-storage";

export function useLogout() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: logout,

        onSuccess: () => {
            clearAccessToken();

            // Remove all cached authenticated data
            queryClient.clear();

            // Redirect to landing page
            router.replace("/");
        },
    });
}