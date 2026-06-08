import { Router } from "express";
const router = Router();

import templatesRouter from "@/routes/dashboard/template.routes";
import documentRouter from "@/routes/dashboard/document.routes";
import jobsRouter from "@/routes/dashboard/jobs.routes";
import userRouter from "@/routes/dashboard/auth.routes";
import testRouter from "@/routes/dashboard/test.routes";

router.use("/users", userRouter);
router.use("/document", documentRouter);
router.use("/jobs", jobsRouter);
router.use("/templates", templatesRouter);
router.use("/certificates", documentRouter);


// Flag : development only 
router.use("/test", testRouter);

export default router;