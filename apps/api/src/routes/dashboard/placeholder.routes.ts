import { Router } from "express";
import wrapAsync from "@/utils/wrapAsync";
import { updatePlaceholderForTemplate, deletePlaceholderForTemplate } from "@/controllers/placeholder.controller";
const router = Router();

router.put("/:id", wrapAsync(updatePlaceholderForTemplate));
router.delete("/:id", wrapAsync(deletePlaceholderForTemplate));

export default router;