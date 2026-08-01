import { performance } from "node:perf_hooks";
import { writeBatchLog } from "./logger";

export type WorkerName =
    | "CertificateWorker"
    | "FinalizerWorker"
    | "WebhookWorker";

export type ProfilerLevel =
    | "minimal"
    | "normal"
    | "verbose";

const LEVELS: Record<ProfilerLevel, number> = {
    minimal: 0,
    normal: 1,
    verbose: 2
};

const envLevel = process.env.WORKER_PROFILING_LEVEL;

const currentLevel: ProfilerLevel =
    envLevel === "minimal" ||
    envLevel === "normal" ||
    envLevel === "verbose"
        ? envLevel
        : "normal";

export const OPERATION_LEVEL = {
    // Minimal
    "Total Worker": "minimal",
    "Total Finalizer": "minimal",

    // Normal
    "Template Fetch": "normal",
    "Render": "normal",
    "Upload Certificate": "normal",

    "Fetch Documents": "normal",
    "Download Certificates": "normal",
    "Create ZIP": "normal",
    "Upload ZIP": "normal",

    // Verbose
    "Fetch S3 Object": "verbose",
    "Stream S3 Object": "verbose",
    "Concatenate S3 Object Chunks": "verbose",
    "Update Batch": "verbose"
} as const;

export type OperationName =
    keyof typeof OPERATION_LEVEL;

export type ProfilerContext = {
    worker: WorkerName;
    operation: OperationName;
    batchJobId?: string;
    documentId?: string;
    keyId?: string;
};

export class Profiler {

    private readonly start = performance.now();

    constructor(
        private readonly context: ProfilerContext
    ) {}

    end() {
        const operationLevel = OPERATION_LEVEL[
            this.context.operation as keyof typeof OPERATION_LEVEL
        ] ?? "normal";

        // console.log(`Current Level: ${currentLevel}, Operation Level: ${operationLevel} for operation ${this.context.operation} in worker ${this.context.worker}`);
        if (
            LEVELS[currentLevel] <
            LEVELS[operationLevel]
        ) {
            return;
        }
        const duration = performance.now() - this.start;
        
        const parts = [`[${this.context.worker}]`];

        if (this.context.batchJobId) {
            parts.push(`Batch=${this.context.batchJobId}`);
        }

        if (this.context.documentId) {
            parts.push(`Document=${this.context.documentId}`);
        }

        if (this.context.keyId) {
            parts.push(`Key=${this.context.keyId}`);
        }

        parts.push(
            `${this.context.operation}: ${duration.toFixed(2)} ms`
        );

        const log = parts.join(" ");

        console.log(parts.join(" "));

        if (this.context.batchJobId) {
            writeBatchLog(
                this.context.batchJobId,
                log
            );
        }

        return duration;
    }
}