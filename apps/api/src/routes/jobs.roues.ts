import { Router } from "express";
const router = Router();
import {createSingleJob, createBatchJob, getJobStatus, downloadJobZip } from "@/controllers/jobs.controller";
import wrapAsync from "@/utils/wrapAsync";

router.post("/single", wrapAsync(createSingleJob));
router.post("/batch", wrapAsync(createBatchJob));
router.get("/:jobId", wrapAsync(getJobStatus));
router.get("/:jobId/download", wrapAsync(downloadJobZip));

export default router;
