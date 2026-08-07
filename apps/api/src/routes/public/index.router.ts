import { Router } from "express";
const router = Router();

import { verifyRateLimit } from "#app/middleware/verify-rate-limit";
import { verifyCertificate } from "#app/controllers/verify.controller";

router.get("/certificates/:verifyToken", verifyRateLimit, verifyCertificate);

export default router;