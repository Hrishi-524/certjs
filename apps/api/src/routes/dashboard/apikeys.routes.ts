import { Router } from "express";
const router = Router();

import wrapAsync from "@/utils/wrapAsync";
import { requireAuth }from "@/middleware/auth.middleware";
import { createApiKey, getApiKey, deleteApiKey, deActivateApiKey, getAllApiKeys } from "@/controllers/apikeys.controller";

router.post("/", requireAuth, wrapAsync(createApiKey));
router.get("/", requireAuth,wrapAsync(getAllApiKeys));
router.get("/:apiKeyId", requireAuth, wrapAsync(getApiKey));
router.delete("/:apiKeyId", requireAuth, wrapAsync(deleteApiKey));
router.post("/:apiKeyId/deactivate", requireAuth, wrapAsync(deActivateApiKey));

export default router;