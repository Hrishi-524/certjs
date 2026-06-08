import { Router } from "express";
const router = Router();

import dashboardRouter from "@/routes/dashboard/index.router";
import developerRouter from "@/routes/developer/index.router";

router.use("/dashboard", dashboardRouter);
router.use("/v1", developerRouter);

export default router;