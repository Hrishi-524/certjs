import { Router } from "express";
const router = Router();

import dashboardRouter from "@/routes/dashboard/index.router";
import developerRouter from "@/routes/developer/index.router";
import publicRouter from "@/routes/public/index.router";

router.use("/dashboard", dashboardRouter);
router.use("/v1", developerRouter);
router.use("/public", publicRouter);

export default router;