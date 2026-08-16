"use client"

import { useQuery } from "@tanstack/react-query"
import { me } from "@/lib/api/auth"
import { MeResponse } from "@/types/auth.types"
import { getAccessToken } from "@/lib/auth/token-storage";

export default function useMe() {
    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            return me();
        },
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
}
/*
(alias) type MeResponse = {
 user: {
 id: string;
 name: string;
 email: string;
 avatarUrl: string | null;
 emailVerified: boolean;
 };
}
import MeResponse
*/