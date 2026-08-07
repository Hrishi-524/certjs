import { Router } from "express";
const router = Router();

import templatesRouter from "#app/routes/dashboard/template.routes";
import documentRouter from "#app/routes/dashboard/document.routes";
import jobsRouter from "#app/routes/dashboard/jobs.routes";
import authRouter from "#app/routes/dashboard/auth.routes";
import apiKeysRouter from "#app/routes/dashboard/apikeys.routes";
import playgroundRouter from "#app/routes/dashboard/playground.routes";
import dashboardRouter from "#app/routes/dashboard/dashboard.routes";

router.use("/auth", authRouter);
router.use("/documents", documentRouter);
router.use("/jobs", jobsRouter);
router.use("/templates", templatesRouter);
router.use("/certificates", documentRouter);
router.use("/api-keys", apiKeysRouter);
router.use("/playground", playgroundRouter);
router.use("/dashboard", dashboardRouter);

export default router;