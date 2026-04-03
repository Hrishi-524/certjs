import { Router } from "express";
import wrapAsync from "@/utils/wrapAsync";
import { insertTempUser } from "@/controllers/users.controller";
const router = Router();

router.post("/temp", wrapAsync(insertTempUser));

export default router;