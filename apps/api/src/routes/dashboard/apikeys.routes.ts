import { Router } from "express";
const router = Router();

import wrapAsync from "@/utils/wrapAsync";
import { requireAuth }from "@/middleware/auth.middleware";
import { createApiKey, getApiKey, deleteApiKey, deActivateApiKey } from "@/controllers/apikeys.controller";

router.post("/", requireAuth, wrapAsync(createApiKey));
router.get("/", requireAuth, wrapAsync(getApiKey));
router.delete("/:keyId", requireAuth, wrapAsync(deleteApiKey));
router.post("/:keyId/deactivate", requireAuth, wrapAsync(deActivateApiKey));

export default router;