import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function SidebarSkeleton() {
    return (
        <aside className="hidden h-svh w-60 shrink-0 border-r bg-sidebar p-3 md:block">
            <div className="mb-6 flex items-center gap-3 px-2 py-3">
                <Skeleton className="size-9 rounded-lg" />
                <Skeleton className="h-5 w-28" />
            </div>

            <div className="space-y-2">
                {Array.from({ length: 7 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-3 rounded-md px-2 py-2">
                        <Skeleton className="size-5 rounded-md" />
                        <Skeleton className="h-4 w-28" />
                    </div>
                ))}
            </div>

            <div className="mt-auto space-y-3 pt-10">
                <Skeleton className="h-9 w-full rounded-md" />
                <div className="flex items-center gap-3 px-2">
                    <Skeleton className="size-8 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                </div>
            </div>
        </aside>
    );
}

function HeaderSkeleton() {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 sm:px-6">
            <div className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-md md:hidden" />
                <Skeleton className="h-5 w-36" />
            </div>

            <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-24 rounded-md" />
                <Skeleton className="size-9 rounded-full" />
            </div>
        </header>
    );
}

export function DashboardContentSkeleton() {
    return (
        <div className="space-y-8">
            <section className="space-y-2">
                <Skeleton className="h-9 w-64" />
                <Skeleton className="h-5 w-96 max-w-full" />
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Card key={index}>
                        <CardContent className="space-y-4 p-6">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="size-10 rounded-lg" />
                            </div>
                            <Skeleton className="h-8 w-20" />
                            <Skeleton className="h-3 w-32" />
                        </CardContent>
                    </Card>
                ))}
            </section>

            <section className="rounded-lg border bg-card">
                <div className="flex items-center justify-between border-b p-5">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-9 w-28 rounded-md" />
                </div>

                <div className="divide-y">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="grid gap-4 p-5 md:grid-cols-[minmax(0,1.4fr)_120px_120px_100px]"
                        >
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-48 max-w-full" />
                                <Skeleton className="h-4 w-36 max-w-full" />
                            </div>
                            <Skeleton className="h-6 w-24 rounded-full" />
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-9 w-20 rounded-md md:justify-self-end" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export function DashboardLayoutSkeleton() {
    return (
        <div className="flex h-svh min-h-0 bg-background">
            <SidebarSkeleton />

            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <HeaderSkeleton />
                <div className="min-h-0 flex-1 overflow-auto">
                    <main className="mx-auto w-full max-w-[112rem] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
                        <DashboardContentSkeleton />
                    </main>
                </div>
            </div>
        </div>
    );
}

export function DashboardSkeleton() {
    return (
        <main className="mx-auto w-full max-w-[112rem] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
            <DashboardContentSkeleton />
        </main>
    );
}
