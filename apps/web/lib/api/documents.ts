import clientApi  from '@/lib/api/client'
import { GetDocumentResponse, DownloadDocumentResponse } from '@/types/documents.types'

export async function getDocument(documentId: string): Promise<GetDocumentResponse> {
    const { data } = await clientApi.get<GetDocumentResponse>(`/dashboard/documents/${documentId}`)
    return data
}

export async function downloadDocument(documentId: string): Promise<DownloadDocumentResponse> {
    const { data } = await clientApi.get<DownloadDocumentResponse>(`/dashboard/documents/${documentId}/download`)
    return data
}