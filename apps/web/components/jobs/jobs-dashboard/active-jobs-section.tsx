"use client";

import JobCard from "./job-card";

import type { JobSummary } from "@/types/jobs.types";

type ActiveJobsSectionProps = {
    jobs: JobSummary[];
};

export default function ActiveJobsSection({
    jobs,
}: ActiveJobsSectionProps) {
    if (jobs.length === 0) {
        return (
            <section className="space-y-2">
                <h2 className="text-lg font-semibold tracking-tight">
                    Active Jobs
                </h2>

                <p className="text-sm text-muted-foreground">
                    No active jobs.
                </p>
            </section>
        );
    }

    return (
        <section className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">
                Active Jobs
            </h2>

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
