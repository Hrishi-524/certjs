import { apiKeys, documents, jobs, templates } from "@certjs/db";
import { db } from "@certjs/db";
import { inArray } from "drizzle-orm";
import { eq, and } from "drizzle-orm";
import { desc } from "drizzle-orm";
import { storage } from "@certjs/storage";

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
        db.$count(templates, eq(templates.userId, userId)),

        db.$count(apiKeys, eq(apiKeys.userId, userId)),

        getDocumentCount(userId),

        db.$count(jobs, eq(jobs.userId, userId)),

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
        userId: templates.userId,
        name: templates.name,
        storageKey: templates.storageKey,
        version: templates.version,
        isActive: templates.isActive,
        width: templates.width,
        height: templates.height,
        createdAt: templates.createdAt,
        updatedAt: templates.updatedAt
    }).from(templates)
    .where(eq(templates.userId, userId))
    .orderBy(desc(templates.createdAt))
    .limit(recentTemplatesLimit);

    const recentTemplatesWithPresignedUrls = await Promise.all(
        recentTemplates.map(async ({ storageKey, ...template }) => ({
            ...template,
            presignedUrl: await storage.getSignedUrl(storageKey),
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
            eq(jobs.id, documents.jobId)
        )
        .where(
            eq(jobs.userId, userId)
        );
    return docs.length;
}

async function getActiveJobs(userId: string, activeJobsLimit: number) {
    const activeJobs = await db
    .select({
        id: jobs.id,
        status: jobs.status,
        processedCount: jobs.processedCount,
        totalCount: jobs.totalCount,
        failedCount: jobs.failedCount,

        template: {
            id: templates.id,
            name: templates.name
        },

        createdAt: jobs.createdAt
    })
    .from(jobs)
    .innerJoin(
        templates,
        eq(jobs.templateId, templates.id)
    )
    .where(
        and(
            eq(jobs.userId, userId),
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
        processedCount: jobs.processedCount,
        totalCount: jobs.totalCount,
        failedCount: jobs.failedCount,
        createdAt: jobs.createdAt,
        completedAt: jobs.completedAt,

        template: {
            id: templates.id,
            name: templates.name
        },  
    })
    .from(jobs)
    .innerJoin(
        templates,
        eq(jobs.templateId, templates.id)
    )
    .where(eq(jobs.userId, userId))
    .orderBy(desc(jobs.createdAt))
    .limit(recentJobsLimit);

    return recentJobs;
}
