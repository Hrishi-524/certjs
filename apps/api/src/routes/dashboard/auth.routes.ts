import { Router } from "express";
import wrapAsync from "#app/utils/wrapAsync";
import { signUpUser, loginUser, logoutUser, getCurrentUser, refreshAccessToken, logoutAllUserSessions, redirectToGoogleAuth, handleGoogleAuthCallback} from "#app/controllers/auth.controller";
import { requireAuth } from "#app/middleware/auth.middleware";
import { signUpSchema, loginSchema } from "#app/schema/auth.schema";
import { validateRequest } from "#app/middleware/validate-request";
const router = Router();

router.post("/signup", validateRequest(signUpSchema), wrapAsync(signUpUser));

router.post("/login", validateRequest(loginSchema), wrapAsync(loginUser));

router.post("/logout", wrapAsync(logoutUser));

router.get("/me", requireAuth, wrapAsync(getCurrentUser));

router.post("/refresh", wrapAsync(refreshAccessToken));

router.post("/logout-all", wrapAsync(logoutAllUserSessions));

router.get("/google", wrapAsync(redirectToGoogleAuth));

router.get("/google/callback", wrapAsync(handleGoogleAuthCallback));

export default router;