import { Skeleton } from "@/components/ui/skeleton";

export function DocsSkeleton() {
    return (
        <div className="mx-auto grid w-full max-w-[1500px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8 xl:grid-cols-[260px_minmax(0,1fr)_220px] 2xl:px-10">
            <aside className="hidden min-w-0 space-y-3 lg:block">
                <Skeleton className="h-7 w-32" />
                {Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton key={index} className="h-9 w-full rounded-md" />
                ))}
            </aside>

            <main className="min-w-0 space-y-8">
                <div className="space-y-3">
                    <Skeleton className="h-10 w-72 max-w-full" />
                    <Skeleton className="h-5 w-full max-w-2xl" />
                    <Skeleton className="h-5 w-4/5 max-w-xl" />
                </div>

                {Array.from({ length: 4 }).map((_, index) => (
                    <section key={index} className="space-y-4">
                        <Skeleton className="h-7 w-48" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-11/12" />
                            <Skeleton className="h-4 w-9/12" />
                        </div>
                        <Skeleton className="h-36 w-full rounded-lg" />
                    </section>
                ))}
            </main>

            <aside className="hidden min-w-0 space-y-3 xl:block">
                <Skeleton className="h-6 w-24" />
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} className="h-4 w-full" />
                ))}
            </aside>
        </div>
    );
}
