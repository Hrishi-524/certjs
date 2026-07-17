export type Template = {
    id?: string;
    templateId?: string;
    userId: string;
    name: string;
    s3Url: string;
    s3Key?: string;
    version?: number;
    isActive?: boolean;
    width: number;
    height: number;
    createdAt: string;
};

export type GetDimensionsResponse = {
    width: number;
    height: number;
}

export type ImageInfo = {
    width: number;
    height: number;
    mimeType: string;
    previewUrl: string;
};

export type UploadTemplateInput = {
    template: File; // field name must be "template"; PNG, JPEG, or WebP; max 5 MB
    name: string;   // 1-100 chars
    width: number;  // integer, positive, max 10000
    height: number; // integer, positive, max 10000
}

export type UploadTemplateResponse = {
    templateId: string;
    userId: string;
    s3Key: string;
    s3Url: string;
    name: string;
    width: number;
    height: number;
    createdAt: string;
}

export type ListTemplatesResponse = Array<{
    id: string;
    userId: string;
    name: string;
    s3Url: string;
    version: number;
    isActive: boolean;
    width: number;
    height: number;
    createdAt: string;
}>

export type GetTemplateResponse = {
    templateId: string;
    userId: string;
    presignedUrl: string;
    name: string;
    width: number;
    height: number;
    createdAt: string;
}

export type UpdateTemplateNameResponse = {
    templateId: string;
    userId: string;
    s3Url: string;
    name: string;
    width: number;
    height: number;
    createdAt: string;
}