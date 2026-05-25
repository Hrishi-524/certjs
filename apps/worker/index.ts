import { Worker } from "bullmq";
import IORedis from "ioredis";
import { renderCertificate } from "@certjs/core/render-engine"
import { documents, jobs, templates, placeholders } from "@certjs/db/schema"
import fetchTemplateBuffer from "./fetch-template-buffer";
import { db } from "@certjs/db"
import { eq } from "drizzle-orm";

const connection = new IORedis({
    host: "127.0.0.1",
    port: 6379,
});

export const worker = new Worker( "certificates", async (job) => {
    console.log(`Processing job ${job.id} with data:`, job.data);

    const { document_id } = job.data;

    try {
        // 1. Fetch document
        const [document] = await db.select().from(documents).where(eq(document_id, documents.id));

        // 2. Ideompotency guard
        if(document.status === "completed") {
            return
        }

        // 3. Mark document as "processing"
        await db.update(documents).set({ status: "processing" }).where(eq(documents.id, document_id));

        // 4.Fetch job
        const [batch_job] = await db.select().from(jobs).where(eq(jobs.id, document.job_id));

        if(!batch_job) {
            throw new Error("Job not found")
        }

        // 5.Fetch template
        const [template] = await db.select().from(templates).where(eq(templates.id, batch_job.template_id));

        if(!template) {
            throw new Error("Template not found")
        }

        // 6. Fecth placeholders : PS there will be many placeholders for each template, but we are fetching all of them in one go to minimize DB calls. We can optimize this later if needed.
        const placeholders_definations = await db.select().from(placeholders).where(eq(placeholders.template_id, template.id));

        const formattedPlaceholders = placeholders_definations.map(p => ({
            ...p,
            x: Number(p.x),
            y: Number(p.y),
            width: Number(p.width),
            min_font_size:  p.min_font_size ? Number(p.min_font_size) : undefined,
        }));

        // 7. Fetch template buffer from S3
        if(template.s3_url === null) {
            throw new Error("Template has no associated buffer URL");
        }
        const templateBuffer = await fetchTemplateBuffer(template.s3_url);

        // 8. Validate data
        const data = document.recipient_data;

        for (const placeholder of placeholders_definations) {
            if (!(placeholder.key in data)) {
                throw new Error(`Missing field: ${placeholder.name}`);
            }
        }

        // 9 Upload
        const renderedBuffer = await renderCertificate({
            templateBuffer,
            placeholders: formattedPlaceholders,
            data,
        });

        // 10. Update document record with S3 URL and mark as completed
        await db.update(documents).set({ s3_url: "https://example.com/rendered-certificate.png", status: "completed" }).where(eq(documents.id, document_id));

        // 11. Update processed count in job
        await db.update(jobs).set({ processed_count: batch_job.processed_count + 1 }).where(eq(jobs.id, batch_job.id));

        // 12. atomic increment
        await db.execute(`
            UPDATE jobs
            SET processed_count = processed_count + 1
            WHERE id = '${batch_job.id}'
        `);
        
        console.log(`Job ${job.id} completed successfully`);
    } catch (error) {
        console.error("Worker error:", error);
        await db.update(documents).set({ status: "failed",error: String(error) }).where(eq(documents.id, document_id));

        // Required for bullmq retry
        throw error; 
    }
}, { connection, concurrency: 5 });

/** 
    Function renderCertificate() Input Params expects this in json
    rendercertificate(input : RenderInput{
        templateBuffer: Buffer;
        placeholders: Placeholder[];
        data: Record<string, string>;
    }   
    debugOptions?: {
        enabled?: boolean;
        showBoxes?: boolean;
        showCenters?: boolean;
        showBaselines?: boolean;
    }   // optionol params - no need in producion);
*/
/**
        
        actual schema ==>
        const placeholders_definations: {
            id: string;
            template_id: string;
            name: string;
            x: string;
            y: string;
            key: string;
            width: string;
            strategy: "shrink" | "ellipsis" | "wrap";
            min_font_size: number | null;
            align: "left" | "center" | "right";
            font_size: number;
            font_color: string;
            font_family: string;
            height: number;
        }[]

        core render engine expects this schema ==>
        export interface Placeholder {
            id: string;
            template_id: string;
            name: string;
            x: number;      
            y: number;
            key: string;
            width: number;
            strategy: "shrink" | "ellipsis" | "wrap";
            min_font_size?: number;
            align: "left" | "center" | "right";
            font_size: number;
            font_color: string;
            font_family: string;
            height: number;
        }

        export interface RenderInput {
            templateBuffer: Buffer;
            placeholders: Placeholder[];
            data: Record<string, string>;
        }

*/