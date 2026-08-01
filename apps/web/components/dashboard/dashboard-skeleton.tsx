"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <section className="space-y-2">
                <Skeleton className="h-9 w-64" />
                <Skeleton className="h-5 w-96 max-w-full" />
            </section>

            {/* Stats */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Card key={index}>
                        <CardContent className="space-y-4 p-6">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-10 w-10 rounded-lg" />
                            </div>

                            <Skeleton className="h-8 w-20" />
                        </CardContent>
                    </Card>
                ))}
            </section>

            {/* Main Row */}
            <section className="grid gap-4 xl:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index}>
                        <CardContent className="space-y-4 p-6">
                            <Skeleton className="h-6 w-40" />

                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-2/3" />

                            <Skeleton className="h-10 w-full" />
                        </CardContent>
                    </Card>
                ))}
            </section>

            {/* Recent Jobs */}
            <section className="space-y-4">
                <Skeleton className="h-7 w-44" />

                <div className="grid gap-4 lg:grid-cols-2">
                    {Array.from({ length: 2 }).map((_, index) => (
                        <Card key={index}>
                            <CardContent className="space-y-4 p-6">
                                <Skeleton className="h-6 w-48" />
                                <Skeleton className="h-5 w-24" />
                                <Skeleton className="h-4 w-36" />
                                <Skeleton className="h-10 w-28" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Recent Templates */}
            <section className="space-y-4">
                <Skeleton className="h-7 w-52" />

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Card key={index}>
                            <Skeleton className="aspect-[16/9] w-full" />

                            <CardContent className="space-y-3 p-5">
                                <Skeleton className="h-5 w-40" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-5 w-16" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}