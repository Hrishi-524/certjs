import { Router } from "express";
import wrapAsync from "@/utils/wrapAsync";
import { certificateQueue } from "@certjs/queue";

const router = Router();

router.get("/jobs/:documentId", wrapAsync(async (req, res) => {
    await certificateQueue.add("generate_document", {
        documentId: req.params.documentId,
    });
    res.json({ message: "Test route is working!" });
}));

export default router;