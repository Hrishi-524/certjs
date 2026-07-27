"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function JobsDashboardSkeleton() {
    return (
        <div className="space-y-8">
            {/* Overview */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-xl border p-6 space-y-4"
                    >
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                ))}
            </div>

            {/* Active Jobs */}
            <section className="space-y-4">
                <Skeleton className="h-7 w-36" />

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="rounded-xl border p-6 space-y-5"
                        >
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-40" />
                                    <Skeleton className="h-4 w-32" />
                                </div>

                                <Skeleton className="h-8 w-24 rounded-full" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-4 w-10" />
                                </div>

                                <Skeleton className="h-2 w-full" />
                            </div>

                            <div className="flex justify-end">
                                <Skeleton className="h-9 w-28" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Recently Completed */}
            <section className="space-y-4">
                <Skeleton className="h-7 w-48" />

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="rounded-xl border p-6 space-y-5"
                        >
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-40" />
                                    <Skeleton className="h-4 w-32" />
                                </div>

                                <Skeleton className="h-8 w-24 rounded-full" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-4 w-10" />
                                </div>

                                <Skeleton className="h-2 w-full" />
                            </div>

                            <div className="flex justify-end">
                                <Skeleton className="h-9 w-28" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Table */}
            <section className="space-y-4">
                <Skeleton className="h-7 w-28" />

                <div className="rounded-xl border">
                    <div className="border-b p-4">
                        <div className="grid grid-cols-5 gap-4">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="h-4 w-20"
                                />
                            ))}
                        </div>
                    </div>

                    {Array.from({ length: 5 }).map((_, row) => (
                        <div
                            key={row}
                            className="grid grid-cols-5 gap-4 border-b p-4 last:border-b-0"
                        >
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-6 w-24 rounded-full" />
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-5 w-28" />
                            <div className="flex justify-end">
                                <Skeleton className="h-9 w-20" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}