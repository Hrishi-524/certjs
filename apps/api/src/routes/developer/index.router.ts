import { Router } from "express";
import { getDoc } from "@/controllers/document.controller";

const router = Router();

router.get("/certificates/:id", getDoc);

export default router;