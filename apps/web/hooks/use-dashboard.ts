"use client"

import { useQuery } from "@tanstack/react-query"
import { getDashboard } from "@/lib/api/dashboard"
import { DashboardResponse } from "@/types/dashboard.types"

export default function useDashboard() {
    return useQuery({
        queryKey: ["dashboard"],
        queryFn: getDashboard,
        staleTime: 30*1000,
    });
}