import { Router } from "express";
const router = Router();
import { getDoc } from "@/controllers/document.controller";
import wrapAsync from "@/utils/wrapAsync";

router.get("/:docId", wrapAsync(getDoc));

export default router;