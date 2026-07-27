"use client";

import useJobs from "@/hooks/use-jobs";

import ActiveJobsSection from "./active-jobs-section";
import AllJobsTable from "./all-jobs-table";
import JobsDashboardSkeleton from "./jobs-dashboard-skeleton";
import JobsOverview from "./jobs-overview";
import RecentCompletedSection from "./recent-completed-section";

export default function JobsDashboard() {
    const { data, isLoading } = useJobs();

    if (isLoading) {
        return <JobsDashboardSkeleton />;
    }

    if (!data) {
        return null;
    }

    const jobs = data.jobs;

    const ONE_DAY = 24 * 60 * 60 * 1000;
    const now = Date.now();

    const activeJobs = jobs.filter(
        (job) =>
            job.status === "pending" ||
            job.status === "processing"
    );

    const completedJobs = jobs.filter(
        (job) => job.status === "completed"
    );

    const failedJobs = jobs.filter(
        (job) => job.status === "failed"
    );

    const recentCompletedJobs = completedJobs.filter((job) => {
        if (!job.completedAt) {
            return false;
        }

        return (
            now - new Date(job.completedAt).getTime() <= ONE_DAY
        );
    });

    return (
        <div className="space-y-8">
            <JobsOverview
                total={jobs.length}
                active={activeJobs.length}
                completed={completedJobs.length}
                failed={failedJobs.length}
            />

            <ActiveJobsSection jobs={activeJobs} />

            <RecentCompletedSection jobs={recentCompletedJobs} />

            <AllJobsTable jobs={jobs} />
        </div>
    );
}