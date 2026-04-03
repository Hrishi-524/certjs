import { Router } from "express";
const router = Router();

import templatesRouter from "@/routes/internal/template.routes";
import documentRouter from "@/routes/internal/document.routes";
import jobsRouter from "@/routes/internal/jobs.roues";
import userRouter from "@/routes/internal/user.routes";
import testRouter from "@/routes/internal/test.routes";

router.use("/users", userRouter);
router.use("/document", documentRouter);
router.use("/jobs", jobsRouter);
router.use("/templates", templatesRouter);
router.use("/certificates", documentRouter);


// Flag : development only
router.use("/test", testRouter);

export default router;