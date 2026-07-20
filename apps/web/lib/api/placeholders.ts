import clientApi from "@/lib/api/client";
import { CreatePlaceholdersInput, CreatePlaceholdersResponse, ListPlaceholdersResponse, UpdatePlaceholderInput, UpdatePlaceholderResponse } from "@/types/placeholders.types"

export async function listPlaceholders(templateId: string): Promise<ListPlaceholdersResponse> {
    const { data } = await clientApi.get<ListPlaceholdersResponse>(`/dashboard/templates/${templateId}/placeholders`)
    console.log("listPlaceholders data:", data) // Add this line to log the data
    return data
}

export async function syncPlaceholders(templateId: string, input: CreatePlaceholdersInput): Promise<CreatePlaceholdersResponse> {
    const { data } = await clientApi.put<CreatePlaceholdersResponse>(`/dashboard/templates/${templateId}/placeholders`, input)
    return data
}