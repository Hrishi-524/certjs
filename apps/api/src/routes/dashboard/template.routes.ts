import { Router } from "express";
import wrapAsync from "@/utils/wrapAsync";
import { deleteTemplate, getTemplate, getTemplates, uploadTemplate, updateTemplateName } from "@/controllers/templates.controller";
import { syncPlaceholdersForTemplate, getPlaceholdersForTemplate } from "@/controllers/placeholder.controller";
import { uploadTemplateMiddleware } from "@/middleware/upload.middleware";
import { requireAuth } from "@/middleware/auth.middleware";
const router = Router();

router.post("/", requireAuth, uploadTemplateMiddleware.single("template"), wrapAsync(uploadTemplate));
router.get("/", requireAuth, wrapAsync(getTemplates));
router.get("/:templateId", requireAuth, wrapAsync(getTemplate));
router.delete("/:templateId", requireAuth, wrapAsync(deleteTemplate));
router.patch("/:templateId", requireAuth, wrapAsync(updateTemplateName));

router.get("/:templateId/placeholders", requireAuth, wrapAsync(getPlaceholdersForTemplate));
router.put("/:templateId/placeholders", requireAuth, wrapAsync(syncPlaceholdersForTemplate));

export default router;