import { Router } from "express";
const router = Router();

import templatesRouter from "@/routes/template.routes";
import documentRouter from "@/routes/document.routes";
import jobsRouter from "@/routes/jobs.roues";
import placholderRouter from "@/routes/placeholder.routes";
import userRouter from "@/routes/user.routes";
import testRouter from "@/routes/test.routes";

router.use("/users", userRouter);

router.use("/document", documentRouter);
router.use("/jobs", jobsRouter);
router.use("/templates", templatesRouter);
router.use("/placeholder", placholderRouter);
router.use("/test", testRouter);

export default router;