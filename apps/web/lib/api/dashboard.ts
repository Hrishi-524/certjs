// @/lib/api/dashboard.ts
import clientApi from "@/lib/api/client";
import { DashboardResponse } from "@/types/dashboard.types";

export async function getDashboard(): Promise<DashboardResponse> {
    const { data } = await clientApi.get<DashboardResponse>("/dashboard/dashboard");
    return data;
}