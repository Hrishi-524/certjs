import { Router } from "express";
const router = Router();

import templatesRouter from "@/routes/dashboard/template.routes";
import documentRouter from "@/routes/dashboard/document.routes";
import jobsRouter from "@/routes/dashboard/jobs.routes";
import authRouter from "@/routes/dashboard/auth.routes";
import apiKeysRouter from "@/routes/dashboard/apikeys.routes";

router.use("/auth", authRouter);
router.use("/document", documentRouter);
router.use("/jobs", jobsRouter);
router.use("/templates", templatesRouter);
router.use("/certificates", documentRouter);
router.use("/api-keys", apiKeysRouter);

export default router;