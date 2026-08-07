import { apikeys, documents, jobs, templates } from "@certjs/db";
import { db } from "@certjs/db";
import { inArray } from "drizzle-orm";
import { eq, and } from "drizzle-orm";
import { desc } from "drizzle-orm";
import generatePresignedUrl from "../documents/get-signed-url.js";
import { getKeyForS3Url } from "../templates/get-key.js";

export async function getDashboardService(userId: string, {
    activeJobsLimit = 4,
    recentJobsLimit = 4,
    recentTemplatesLimit = 3,
}) {
    const [
        templateCount,
        apiKeyCount,
        documentCount,
        jobCount,
        activeJobs,
        recentJobs,
        recentTemplates,
    ] = await Promise.all([
        db.$count(templates, eq(templates.user_id, userId)),

        db.$count(apikeys, eq(apikeys.user_id, userId)),

        getDocumentCount(userId),

        db.$count(jobs, eq(jobs.user_id, userId)),

        getActiveJobs(userId, activeJobsLimit),

        getRecentJobs(userId, recentJobsLimit),

        getRecentTemplates(userId, recentTemplatesLimit),
    ]);

    return {
        stats: {
            templates: templateCount,
            jobs: jobCount,
            apiKeys: apiKeyCount,
            documents: documentCount,
        },

        setup: {
            hasTemplate: templateCount > 0,
            hasApiKey: apiKeyCount > 0,
            hasGeneratedBatch: jobCount > 0,
        },

        activeJobs,

        recentJobs,

        recentTemplates,
    };
}

async function getRecentTemplates(userId: string, recentTemplatesLimit: number) {
    const recentTemplates = await db.select({
        id: templates.id,
        userId: templates.user_id,
        name: templates.name,
        s3Url: templates.s3_url,
        version: templates.version,
        isActive: templates.is_active,
        width: templates.width,
        height: templates.height,
        createdAt: templates.created_at,
        updatedAt: templates.updated_at
    }).from(templates)
    .where(eq(templates.user_id, userId))
    .orderBy(desc(templates.created_at))
    .limit(recentTemplatesLimit);

    const recentTemplatesWithPresignedUrls = await Promise.all(
        recentTemplates.map(async ({ s3Url, ...template }) => ({
            ...template,
            presignedUrl: await generatePresignedUrl(getKeyForS3Url(s3Url)),
        }))
    );

    return recentTemplatesWithPresignedUrls; 
}

async function getDocumentCount(userId: string) {
    const docs = await db
        .select({ id: documents.id })
        .from(documents)
        .innerJoin(
            jobs, 
            eq(jobs.id, documents.job_id)
        )
        .where(
            eq(jobs.user_id, userId)
        );
    return docs.length;
}

async function getActiveJobs(userId: string, activeJobsLimit: number) {
    const activeJobs = await db
    .select({
        id: jobs.id,
        status: jobs.status,
        processedCount: jobs.processed_count,
        totalCount: jobs.total_count,
        failedCount: jobs.failed_count,

        template: {
            id: templates.id,
            name: templates.name
        },

        createdAt: jobs.created_at
    })
    .from(jobs)
    .innerJoin(
        templates,
        eq(jobs.template_id, templates.id)
    )
    .where(
        and(
            eq(jobs.user_id, userId),
            inArray(jobs.status, [
                "pending",
                "processing",
            ])
        )
    ).limit(activeJobsLimit);

    return activeJobs;
}

async function getRecentJobs(userId: string, recentJobsLimit: number) {
    const recentJobs = await db
    .select({
        id: jobs.id,
        status: jobs.status,
        processedCount: jobs.processed_count,
        totalCount: jobs.total_count,
        failedCount: jobs.failed_count,
        createdAt: jobs.created_at,
        completedAt: jobs.completed_at,

        template: {
            id: templates.id,
            name: templates.name
        },  
    })
    .from(jobs)
    .innerJoin(
        templates,
        eq(jobs.template_id, templates.id)
    )
    .where(eq(jobs.user_id, userId))
    .orderBy(desc(jobs.created_at))
    .limit(recentJobsLimit);

    return recentJobs;
}