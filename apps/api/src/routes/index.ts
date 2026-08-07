import { Router } from "express";
const router = Router();

import dashboardRouter from "#app/routes/dashboard/index.router";
import developerRouter from "#app/routes/developer/index.router";
import publicRouter from "#app/routes/public/index.router";

router.use("/dashboard", dashboardRouter);
router.use("/v1", developerRouter);
router.use("/public", publicRouter);

export default router;