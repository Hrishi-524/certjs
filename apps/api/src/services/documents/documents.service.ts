/**
type RecipientData = Record<string, string | number>;

export const documents = pgTable("documents", {
    id: uuid("id").defaultRandom().primaryKey(),
    job_id: uuid("job_id").notNull().references(() => jobs.id),
    recipient_data: jsonb("recipient_data").$type<RecipientData>().notNull(),
    status: text("status", { enum: ["pending", "processing", "completed", "failed"] }).notNull().default("pending"),
    error: text("error"),
    verify_token: text("verify_token").notNull(),
    s3_url: text("s3_url").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull()
});
*/
export async function createDocService() {
    
}