"use client";

import ActiveJobCard from "./active-job-card";

import { DashboardJob } from "@/types/dashboard.types";

type ActiveJobsProps = {
    jobs: DashboardJob[];
};

export default function ActiveJobs({
    jobs,
}: ActiveJobsProps) {
    if (jobs.length === 0) {
        return null;
    }

    return (
        <section className="space-y-4">
            <div className="space-y-1">
                <h2 className="text-lg font-semibold tracking-tight">
                    Active Jobs
                </h2>

                <p className="text-sm text-muted-foreground">
                    Track certificate batches that are currently running.
                </p>
            </div>

            <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
                {jobs.map((job) => (
                    <ActiveJobCard
                        key={job.id}
                        job={job}
                    />
                ))}
            </div>
        </section>
    );
}
