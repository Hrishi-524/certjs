"use client";

import { Alert02Icon } from "@hugeicons/core-free-icons";

import JobCard from "./job-card";
import JobsEmptyState from "./jobs-empty-state";

import type { JobSummary } from "@/types/jobs.types";

type FailedJobsSectionProps = {
    jobs: JobSummary[];
};

export default function FailedJobsSection({
    jobs,
}: FailedJobsSectionProps) {
    if (jobs.length === 0) {
        return (
            <JobsEmptyState
                title="Failed Jobs"
                description="Jobs that need attention will be grouped here."
                emptyTitle="No failed jobs"
                emptyDescription="Failures will appear here when a batch needs review."
                icon={Alert02Icon}
            />
        );
    }

    return (
        <section className="space-y-3">
            <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">
                    Failed Jobs
                </h2>

                <p className="text-sm text-muted-foreground">
                    Jobs that need attention.
                </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {jobs.map((job) => (
                    <JobCard
                        key={job.id}
                        job={job}
                    />
                ))}
            </div>
        </section>
    );
}
