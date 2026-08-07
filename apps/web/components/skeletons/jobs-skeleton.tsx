import { Skeleton } from "@/components/ui/skeleton";

export function JobsContentSkeleton() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-9 w-32" />
                    <Skeleton className="h-5 w-80 max-w-full" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-32 rounded-md" />
                    <Skeleton className="h-10 w-28 rounded-md" />
                </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="space-y-3 rounded-xl border p-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                ))}
            </div>

            <div className="rounded-xl border bg-card">
                <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
                    <Skeleton className="h-7 w-28" />
                    <div className="flex gap-2">
                        <Skeleton className="h-9 w-36 rounded-md" />
                        <Skeleton className="h-9 w-28 rounded-md" />
                    </div>
                </div>

                <div className="hidden grid-cols-5 gap-4 border-b p-4 md:grid">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="h-4 w-20" />
                    ))}
                </div>

                {Array.from({ length: 7 }).map((_, row) => (
                    <div
                        key={row}
                        className="grid gap-3 border-b p-4 last:border-b-0 md:grid-cols-5 md:gap-4"
                    >
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-4 w-28 md:hidden" />
                        </div>
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-28" />
                        <Skeleton className="h-9 w-20 rounded-md md:justify-self-end" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function JobsSkeleton() {
    return (
        <main className="mx-auto w-full max-w-[112rem] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
            <JobsContentSkeleton />
        </main>
    );
}
