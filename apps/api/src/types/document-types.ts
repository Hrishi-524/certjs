import { documents } from "@certjs/db";
import type { InferSelectModel } from "drizzle-orm";

export type Document = InferSelectModel<typeof documents>;

export type DocumentWithPresignedUrl = Document & {
    presignedUrl: string | null;
};