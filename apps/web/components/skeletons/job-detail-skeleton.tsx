import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function JobDetailContentSkeleton() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                    <div className="space-y-3">
                        <Skeleton className="h-7 w-56" />
                        <Skeleton className="h-4 w-80 max-w-full" />
                    </div>
                    <Skeleton className="h-6 w-28 rounded-full" />
                </CardHeader>

                <CardContent className="grid gap-6 md:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-5 w-44 max-w-full" />
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-4 p-6">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-12" />
                    </div>
                    <Skeleton className="h-3 w-full rounded-full" />
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Card key={index}>
                        <CardContent className="flex items-start justify-between p-6">
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-9 w-16" />
                                <Skeleton className="h-3 w-28" />
                            </div>
                            <Skeleton className="size-10 rounded-lg" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader className="space-y-3">
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-4 w-80 max-w-full" />
                </CardHeader>
                <CardContent>
                    <div className="rounded-lg border">
                        <div className="hidden grid-cols-4 gap-4 border-b p-4 md:grid">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Skeleton key={index} className="h-4 w-24" />
                            ))}
                        </div>

                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="grid gap-3 border-b p-4 last:border-b-0 md:grid-cols-4"
                            >
                                <Skeleton className="h-5 w-40" />
                                <Skeleton className="h-6 w-24 rounded-full" />
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-9 w-24 rounded-md md:justify-self-end" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export function JobDetailSkeleton() {
    return (
        <main className="mx-auto w-full max-w-[112rem] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
            <JobDetailContentSkeleton />
        </main>
    );
}
