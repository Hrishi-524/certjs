"use client"

import { useQuery } from "@tanstack/react-query"
import { me } from "@/lib/api/auth"
import { MeResponse } from "@/types/auth.types"

export default function useMe()  {
    return useQuery<MeResponse>({
        queryKey: ["me"],
        queryFn: me,
        staleTime: 1000*60*5, // 5 minutes
    })
}