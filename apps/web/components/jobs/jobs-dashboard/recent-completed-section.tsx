"use client";

import { TaskDone01Icon } from "@hugeicons/core-free-icons";

import JobCard from "./job-card";
import JobsEmptyState from "./jobs-empty-state";

import type { JobSummary } from "@/types/jobs.types";

type RecentCompletedSectionProps = {
    jobs: JobSummary[];
};

export default function RecentCompletedSection({
    jobs,
}: RecentCompletedSectionProps) {
    if (jobs.length === 0) {
        return (
            <JobsEmptyState
                title="Recently Completed"
                description="Finished jobs from the last 24 hours."
                emptyTitle="No recent completions"
                emptyDescription="Completed jobs from today will show up here."
                icon={TaskDone01Icon}
            />
        );
    }

    return (
        <section className="space-y-3">
            <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">
                    Recently Completed
                </h2>

                <p className="text-sm text-muted-foreground">
                    Finished jobs from the last 24 hours.
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
