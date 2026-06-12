import multer from "multer";
import { BadRequestError } from "@/middleware/express-errors";

const storage = multer.memoryStorage();

const allowedMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/webp"
];

export const uploadTemplateMiddleware = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: (req, file, cb) => {
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb( new BadRequestError("Only PNG, JPEG, and WebP images are allowed") );
        }

        cb(null, true);
    }
});