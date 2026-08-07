import { Router } from "express";
const router = Router();
import { playgroundPreview } from "#app/controllers/jobs.controller";
import wrapAsync from "#app/utils/wrapAsync";
import {requireAuth} from "#app/middleware/auth.middleware";

router.post("/preview", requireAuth, wrapAsync(playgroundPreview));

export default router;