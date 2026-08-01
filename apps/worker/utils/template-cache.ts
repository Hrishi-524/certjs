const templateCache = new Map<string, Promise<Buffer>>();

export function getTemplate(templateId: string) {
    return templateCache.get(templateId);
}

export function setTemplate(
    templateId: string,
    promise: Promise<Buffer>
) {
    templateCache.set(templateId, promise);
}

export function removeTemplate(templateId: string) {
    templateCache.delete(templateId);
}