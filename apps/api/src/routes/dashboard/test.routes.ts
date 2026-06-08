import { Router } from "express";
import wrapAsync from "@/utils/wrapAsync";
import { certificateQueue } from "@certjs/queue";

const router = Router();

router.get("/jobs/:document_id", wrapAsync(async (req, res) => {
    await certificateQueue.add("generate_document", {
        document_id: req.params.document_id,
    });
    res.json({ message: "Test route is working!" });
}));

export default router;