import multer from "multer";
import { BadRequestError } from "#app/middleware/express-errors";

const storage = multer.memoryStorage();

const allowedMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/jpg"
];

export const uploadTemplateMiddleware = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    },
    fileFilter: (req, file, cb) => {
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb( new BadRequestError("Only PNG, JPEG, JPG, and WebP images are allowed") );
        }

        cb(null, true);
    }
});