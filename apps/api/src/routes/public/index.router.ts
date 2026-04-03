import { Router } from "express";
import { generateCertificate } from "@/controllers/document.controller";

const router = Router();

router.post("/certificates/generate", generateCertificate);

export default router;