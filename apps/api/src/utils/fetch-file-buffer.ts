import { storage } from "@certjs/storage";

export default async function fetchFileBuffer( key: string ):  Promise<Buffer> {
    try {
        return await storage.get(key);
    } catch (err) {
        console.error(`Error fetching stored object ${key}:`, err);
        throw err;
    }
}
