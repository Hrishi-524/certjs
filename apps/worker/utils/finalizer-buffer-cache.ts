export type CachedCertificate = {
    name: string;
    buffer: Buffer;
};

const batchBufferCache = new Map<
    string,
    Map<string, CachedCertificate>
>();

export function cacheRenderedCertificate(
    batchJobId: string,
    documentId: string,
    file: CachedCertificate
) {
    let batch = batchBufferCache.get(batchJobId);

    if (!batch) {
        batch = new Map();
        batchBufferCache.set(batchJobId, batch);
    }

    batch.set(documentId, file);
}

export function getBatchBuffers(batchJobId: string) {
    return batchBufferCache.get(batchJobId);
}

export function clearBatchBuffers(batchJobId: string) {
    batchBufferCache.delete(batchJobId);
}