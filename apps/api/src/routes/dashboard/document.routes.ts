import { Router } from "express";
import { requireAuth } from "@/middleware/auth.middleware";
const router = Router();
import { getDocument, downloadDocument } from "@/controllers/document.controller";
import wrapAsync from "@/utils/wrapAsync";

router.get("/:documentId", requireAuth, wrapAsync(getDocument));
router.get("/:documentId/download", requireAuth, wrapAsync(downloadDocument))

export default router;