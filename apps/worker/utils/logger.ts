import fs from "node:fs";
import path from "node:path";

const LOG_DIR = path.join(process.cwd(), "logs");

export function writeBatchLog(
    batchJobId: string,
    message: string
) {
    const today = new Date().toISOString().split("T")[0];

    const folder = path.join(LOG_DIR, today);

    fs.mkdirSync(folder, { recursive: true });

    const file = path.join(folder, `batch-${batchJobId}.log`);

    fs.appendFileSync(file, message + "\n");
}