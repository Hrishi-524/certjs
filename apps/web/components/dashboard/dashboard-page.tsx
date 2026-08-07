"use client";

import ActiveJobs from "./active-jobs";
import DashboardHeader from "./dashboard-header";
import DashboardSkeleton from "./dashboard-skeleton";
import DashboardStats from "./dashboard-stats";
import QuickActions from "./quick-actions";
import RecentJobs from "./recent-jobs";
import RecentTemplates from "./recent-templates";
import SetupChecklist from "./setup-checklist";

import useDashboard from "@/hooks/use-dashboard";
import WorkspaceOnboarding from "./workspace-onboarding";
import RecentJobsEmpty from "./recent-jobs-empty";
import RecentTemplatesEmpty from "./recent-templates-empty";
import { MeResponse } from "@/types/auth.types";
import { useAuth } from "@/hooks/use-auth";

export default function DashboardPage() {
    const { data: dashboard, isPending: isDashboardPending } = useDashboard();
    const { user } = useAuth()
    
    if (isDashboardPending) {
        return <DashboardSkeleton />;
    }

    if (!dashboard) {
        return null;
    }

    const {
        stats,
        setup,
        activeJobs,
        recentJobs,
        recentTemplates,
    } = dashboard;

    const isNewWorkspace = !setup.hasTemplate && !setup.hasApiKey && !setup.hasGeneratedBatch;
    const hasActiveJobs = activeJobs.length > 0;

    if (isNewWorkspace) {
        return (
            <div className="space-y-6">
                <DashboardHeader
                    name={user.name}
                />

                <WorkspaceOnboarding />

                <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
                    <SetupChecklist setup={setup} />

                    <QuickActions />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <DashboardHeader
                name={user.name}
            />

            <DashboardStats
                stats={stats}
            />

            <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
                <SetupChecklist setup={setup} />

                <QuickActions />
            </div>

            {hasActiveJobs && (
                <div>
                    <ActiveJobs
                        jobs={activeJobs}
                    />
                </div>
            )}

            {recentJobs.length > 0 ? (
                <RecentJobs
                    jobs={recentJobs}
                />
            ) : (
                <RecentJobsEmpty />
            )}

            {recentTemplates.length > 0 ? (
                <RecentTemplates
                    templates={recentTemplates}
                />
            ) : (
                <RecentTemplatesEmpty />
            )}
        </div>
    );
}
