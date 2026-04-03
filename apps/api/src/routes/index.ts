import { Router } from "express";
const router = Router();

import internalRouter from "@/routes/internal/index.router";
import publicRouter from "@/routes/public/index.router";

router.use("/in", internalRouter);
router.use("/v1", publicRouter)

export default router;