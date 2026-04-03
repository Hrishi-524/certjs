import { Router } from "express";
import wrapAsync from "@/utils/wrapAsync";
import { deleteTemplate, getTemplate, getTemplates, uploadTemplate } from "@/controllers/templates.controller";
import { addPlaceholdersToTemplate, getPlaceholdersForTemplate } from "../controllers/placeholder.controller";
import { uploadTemplateMiddleware } from "@/middleware/upload.middleware";
const router = Router();

router.post("/", uploadTemplateMiddleware.single("template"), wrapAsync(uploadTemplate));
router.get("/", wrapAsync(getTemplates));
router.get("/:id", wrapAsync(getTemplate));
router.delete("/:id", wrapAsync(deleteTemplate));

router.post("/:id/placeholders", wrapAsync(addPlaceholdersToTemplate));
router.get("/:id/placeholders", wrapAsync(getPlaceholdersForTemplate));

export default router;