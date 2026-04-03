import multer from "multer";

const storage = multer.memoryStorage();

export const uploadTemplateMiddleware = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});