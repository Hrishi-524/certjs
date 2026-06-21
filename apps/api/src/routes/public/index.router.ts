import { Router } from "express";
const router = Router();

import { verifyRateLimit } from "@/middleware/verify-rate-limit";
import { verifyCertificate } from "@/controllers/verify.controller";

router.get("/certificates/:verifyToken", verifyRateLimit, verifyCertificate);

export default router;