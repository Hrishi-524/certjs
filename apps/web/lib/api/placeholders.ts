import clientApi from "@/lib/api/client";
import { CreatePlaceholdersInput, CreatePlaceholdersResponse, ListPlaceholdersResponse, UpdatePlaceholderInput, UpdatePlaceholderResponse } from "@/types/placeholders.types"

export async function listPlaceholders(templateId: string): Promise<ListPlaceholdersResponse> {
    const { data } = await clientApi.get<ListPlaceholdersResponse>(`/dashboard/templates/${templateId}/placeholders`)
    return data
}

export async function createPlaceholders(templateId: string, input: CreatePlaceholdersInput): Promise<CreatePlaceholdersResponse> {
    const { data } = await clientApi.post<CreatePlaceholdersResponse>(`/dashboard/templates/${templateId}/placeholders`, input)
    return data
}

export async function updatePlaceholder(templateId: string, placeholderId: string, input: UpdatePlaceholderInput): Promise<UpdatePlaceholderResponse> {
    const { data } = await clientApi.put<UpdatePlaceholderResponse>(`/dashboard/templates/${templateId}/placeholders/${placeholderId}`, input)
    return data
}

export async function deletePlaceholder(templateId: string, placeholderId: string): Promise<void> {
    await clientApi.delete(`/dashboard/templates/${templateId}/placeholders/${placeholderId}`)
}   