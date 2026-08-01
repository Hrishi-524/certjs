"use client";

import {
    ApiIcon,
    DocumentValidationIcon,
    JobLinkIcon,
    LicenseDraftIcon,
} from "@hugeicons/core-free-icons";

import StatCard from "./stat-card";

import { DashboardStats as DashboardStatsType } from "@/types/dashboard.types";

type DashboardStatsProps = {
    stats: DashboardStatsType;
};

export default function DashboardStats({
    stats,
}: DashboardStatsProps) {
    return (
        <section className="space-y-4">
            <div>
                <h2 className="text-lg font-semibold tracking-tight">
                    Overview
                </h2>

                <p className="text-sm text-muted-foreground">
                    A quick snapshot of your CertJS workspace.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Templates"
                    value={stats.templates}
                    icon={LicenseDraftIcon}
                />

                <StatCard
                    title="Jobs"
                    value={stats.jobs}
                    icon={JobLinkIcon}
                />

                <StatCard
                    title="API Keys"
                    value={stats.apiKeys}
                    icon={ApiIcon}
                />

                <StatCard
                    title="Documents"
                    value={stats.documents}
                    icon={DocumentValidationIcon}
                />
            </div>
        </section>
    );
}