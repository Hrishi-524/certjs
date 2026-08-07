import { Router } from "express";
import { requireAuth } from "#app/middleware/auth.middleware";
const router = Router();
import { getDocument, downloadDocument } from "#app/controllers/document.controller";
import wrapAsync from "#app/utils/wrapAsync";

router.get("/:documentId", requireAuth, wrapAsync(getDocument));
router.get("/:documentId/download", requireAuth, wrapAsync(downloadDocument))

export default router;