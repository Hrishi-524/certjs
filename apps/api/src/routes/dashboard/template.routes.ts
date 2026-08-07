import { Router } from "express";
import wrapAsync from "#app/utils/wrapAsync";
import { deleteTemplate, getTemplate, getTemplates, uploadTemplate, updateTemplateName, activateTemplate, deactivateTemplate } from "#app/controllers/templates.controller";
import { syncPlaceholdersForTemplate, getPlaceholdersForTemplate } from "#app/controllers/placeholder.controller";
import { uploadTemplateMiddleware } from "#app/middleware/upload.middleware";
import { requireAuth } from "#app/middleware/auth.middleware";
const router = Router();

router.post("/", requireAuth, uploadTemplateMiddleware.single("template"), wrapAsync(uploadTemplate));
router.get("/", requireAuth, wrapAsync(getTemplates));
router.get("/:templateId", requireAuth, wrapAsync(getTemplate));
router.delete("/:templateId", requireAuth, wrapAsync(deleteTemplate));
router.patch("/:templateId", requireAuth, wrapAsync(updateTemplateName));
router.post("/:templateId/deactivate", requireAuth, wrapAsync(deactivateTemplate));
router.post("/:templateId/activate", requireAuth, wrapAsync(activateTemplate));

router.get("/:templateId/placeholders", requireAuth, wrapAsync(getPlaceholdersForTemplate));
router.put("/:templateId/placeholders", requireAuth, wrapAsync(syncPlaceholdersForTemplate));

export default router;