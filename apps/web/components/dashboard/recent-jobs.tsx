"use client";

import RecentJobCard from "./recent-job-card";

import { DashboardRecentJob } from "@/types/dashboard.types";

type RecentJobsProps = {
    jobs: DashboardRecentJob[];
};

export default function RecentJobs({
    jobs,
}: RecentJobsProps) {
    if (jobs.length === 0) {
        return null;
    }

    return (
        <section className="space-y-4">
            <div className="space-y-1">
                <h2 className="text-lg font-semibold tracking-tight">
                    Recent Jobs
                </h2>

                <p className="text-sm text-muted-foreground">
                    Review recently completed certificate batches.
                </p>
            </div>

            <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
                {jobs.map((job) => (
                    <RecentJobCard
                        key={job.id}
                        job={job}
                    />
                ))}
            </div>
        </section>
    );
}
