import { Router } from "express";
import wrapAsync from "@/utils/wrapAsync";
import { signUpUser, loginUser, logoutUser, getCurrentUser, refreshAccessToken, logoutAllUserSessions} from "@/controllers/auth.controller";
import { requireAuth } from "@/middleware/auth.middleware";
import { signUpSchema, loginSchema } from "@/schema/auth.schema";
import { validateRequest } from "@/middleware/validate-request";
const router = Router();

router.post("/signup", validateRequest(signUpSchema), wrapAsync(signUpUser));

router.post("/login", validateRequest(loginSchema), wrapAsync(loginUser));

router.post("/logout", wrapAsync(logoutUser));

router.get("/me", requireAuth, wrapAsync(getCurrentUser));

router.post("/refresh", wrapAsync(refreshAccessToken));

router.post("/logout-all", wrapAsync(logoutAllUserSessions));

export default router;