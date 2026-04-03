import { Router } from "express";
const router = Router();
import { createBatchJob, getJobStatus, downloadJobZip, retryJob, getJobDocuments } from "@/controllers/jobs.controller";
import wrapAsync from "@/utils/wrapAsync";

router.post("/", wrapAsync(createBatchJob));
router.get("/:jobId", wrapAsync(getJobStatus));
router.get("/:jobId/download", wrapAsync(downloadJobZip));
router.post("/:jobId/retry", wrapAsync(retryJob));
router.get("/:jobId/documents", wrapAsync(getJobDocuments));

export default router;
