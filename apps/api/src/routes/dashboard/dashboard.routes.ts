import { Router } from "express";
const router = Router();

import { getDashboard } from "@/controllers/dashboard.controller";
import wrapAsync from "@/utils/wrapAsync";
import { requireAuth } from "@/middleware/auth.middleware";

router.get("/", requireAuth, wrapAsync(getDashboard));

export default router;