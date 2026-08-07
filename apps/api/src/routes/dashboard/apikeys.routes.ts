import { Router } from "express";
const router = Router();

import wrapAsync from "#app/utils/wrapAsync";
import { requireAuth }from "#app/middleware/auth.middleware";
import { createApiKey, getApiKey, deleteApiKey, deActivateApiKey, getAllApiKeys } from "#app/controllers/apikeys.controller";

router.post("/", requireAuth, wrapAsync(createApiKey));
router.get("/", requireAuth,wrapAsync(getAllApiKeys));
router.get("/:apiKeyId", requireAuth, wrapAsync(getApiKey));
router.delete("/:apiKeyId", requireAuth, wrapAsync(deleteApiKey));
router.post("/:apiKeyId/deactivate", requireAuth, wrapAsync(deActivateApiKey));

export default router;