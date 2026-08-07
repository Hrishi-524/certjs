import { Router } from "express";
const router = Router();

import { getDashboard } from "#app/controllers/dashboard.controller";
import wrapAsync from "#app/utils/wrapAsync";
import { requireAuth } from "#app/middleware/auth.middleware";

router.get("/", requireAuth, wrapAsync(getDashboard));

export default router;