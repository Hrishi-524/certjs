import { getDocument } from "#app/controllers/document.controller";
import { createBatchJob, getJobDocuments, getJobStatus, downloadJobZip, retryJob } from "#app/controllers/jobs.controller";
import { requireApiKey } from "#app/middleware/require-api-key";
import wrapAsync from "#app/utils/wrapAsync";
import { Router } from "express";
const router = Router();

// certificate creation endpoint
router.post("/jobs", requireApiKey, wrapAsync(createBatchJob));

// polling endpoint
router.get("/jobs/:jobId", requireApiKey, wrapAsync(getJobStatus));

// fetch all certificates in job
router.get("/jobs/:jobId/documents", requireApiKey, wrapAsync(getJobDocuments));

// download job zip after completion
router.get("/jobs/:jobId/download", requireApiKey, wrapAsync(downloadJobZip));

// retry job for processing of failed documents
router.post("/jobs/:jobId/retry", requireApiKey, wrapAsync(retryJob));

// get a particular document
router.get("/documents/:documentId", requireApiKey, wrapAsync(getDocument))

export default router;