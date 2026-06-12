import { Router } from "express";
import wrapAsync from "@/utils/wrapAsync";
import { deleteTemplate, getTemplate, getTemplates, uploadTemplate, updateTemplateName } from "@/controllers/templates.controller";
import { addPlaceholdersToTemplate, getPlaceholdersForTemplate, updatePlaceholderForTemplate, deletePlaceholderForTemplate } from "../../controllers/placeholder.controller";
import { uploadTemplateMiddleware } from "@/middleware/upload.middleware";
import { requireAuth } from "@/middleware/auth.middleware";
const router = Router();

router.post("/", requireAuth, uploadTemplateMiddleware.single("template"), wrapAsync(uploadTemplate));
router.get("/", requireAuth, wrapAsync(getTemplates));
router.get("/:id", requireAuth, wrapAsync(getTemplate));
router.delete("/:id", requireAuth, wrapAsync(deleteTemplate));
router.patch("/:id", requireAuth, wrapAsync(updateTemplateName));

router.post("/:id/placeholders", requireAuth, wrapAsync(addPlaceholdersToTemplate));
router.get("/:id/placeholders", requireAuth, wrapAsync(getPlaceholdersForTemplate));
router.put("/:id/placeholders/:placeholderId", requireAuth, wrapAsync(updatePlaceholderForTemplate));
router.delete("/:id/placeholders/:placeholderId", requireAuth, wrapAsync(deletePlaceholderForTemplate));

export default router;