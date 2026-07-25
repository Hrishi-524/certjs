import { Router } from "express";
const router = Router();
import { playgroundPreview } from "@/controllers/jobs.controller";
import wrapAsync from "@/utils/wrapAsync";
import {requireAuth} from "@/middleware/auth.middleware";

router.post("/preview", requireAuth, wrapAsync(playgroundPreview));

export default router;