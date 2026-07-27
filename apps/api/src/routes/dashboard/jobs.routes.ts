import { Router } from "express";
const router = Router();
import { createBatchJob, getJobStatus, downloadJobZip, retryJob, getJobDocuments, getJobs } from "@/controllers/jobs.controller";
import wrapAsync from "@/utils/wrapAsync";
import {requireAuth} from "@/middleware/auth.middleware";

router.post("/", requireAuth, wrapAsync(createBatchJob));
router.get("/:jobId", requireAuth, wrapAsync(getJobStatus));
router.get("/:jobId/download", requireAuth, wrapAsync(downloadJobZip));
router.post("/:jobId/retry", requireAuth, wrapAsync(retryJob));
router.get("/:jobId/documents", requireAuth, wrapAsync(getJobDocuments));
router.get("/", requireAuth, wrapAsync(getJobs));

export default router;