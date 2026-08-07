import clientApi from "@/lib/api/client";
import { ActivateTemplateResponse, DeactivateTemplateResponse, GetTemplateResponse, ListTemplatesResponse, UpdateTemplateNameResponse, UploadTemplateInput, UploadTemplateResponse } from "@/types/templates.types";

export async function uploadTemplate(input: UploadTemplateInput): Promise<UploadTemplateResponse> {
    const formData = new FormData();
    formData.append("template", input.template);
    formData.append("name", input.name);
    formData.append("width", String(input.width));
    formData.append("height", String(input.height));
    const { data } = await clientApi.post<UploadTemplateResponse>("/dashboard/templates", formData);
    return data;
}

export async function listTemplates(): Promise<ListTemplatesResponse> {
    const { data } = await clientApi.get<ListTemplatesResponse>("/dashboard/templates")
    return data
}

export async function getTemplate(id: string): Promise<GetTemplateResponse> {
    const { data } = await clientApi.get<GetTemplateResponse>(`/dashboard/templates/${id}`);
    return data
}

export async function updateTemplateName(id: string, name: string): Promise<UpdateTemplateNameResponse> {
    const { data } = await clientApi.patch<UpdateTemplateNameResponse>(`/dashboard/templates/${id}`, { name });
    return data
}

export async function deleteTemplate(id: string): Promise<void> {
    await clientApi.delete(`/dashboard/templates/${id}`);
}

export async function activateTemplate(id: string): Promise<ActivateTemplateResponse> {
    console.log(`lib/api/templates.ts: Activating template with id: ${id}`);
    const { data } = await clientApi.post<ActivateTemplateResponse>(`/dashboard/templates/${id}/activate`);
    return data
}

export async function deactivateTemplate(id: string): Promise<DeactivateTemplateResponse> {
    const { data } = await clientApi.post<DeactivateTemplateResponse>(`/dashboard/templates/${id}/deactivate`);
    return data
}