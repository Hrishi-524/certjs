import { pgEnum } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("job_status", ["queued", "processing", "done", "failed"]);

export const oauthProviderEnum = pgEnum("oauth_provider", ["google"])

export const placeholderTypeEnum = pgEnum("placeholder_type", ["text", "image", "date", "number", "qr", "signature", "barcode", "url", "email"]);

export const jobTypeEnum = pgEnum("job_type", ["CERTIFICATE_BATCH"])

export const jobStatusEnum = pgEnum("job_status", ["pending", "processing", "completed", "failed"])

export const placeholderStartergyEnum = pgEnum("placeholder_startergy", ["shrink", "ellipsis", "wrap"])

export const placeholderTextAlignEnum = pgEnum("placeholder_align", ["left", "center", "right"])
