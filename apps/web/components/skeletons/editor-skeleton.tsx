import { Skeleton } from "@/components/ui/skeleton";

export function EditorSkeleton() {
    return (
        <div className="flex h-full min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-background">
            <div className="flex h-14 shrink-0 items-center justify-between border-b px-4">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-24 rounded-md" />
                    <Skeleton className="h-5 w-40" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="size-9 rounded-md" />
                    <Skeleton className="size-9 rounded-md" />
                    <Skeleton className="h-9 w-24 rounded-md" />
                </div>
            </div>

            <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
                <aside className="hidden h-full w-60 shrink-0 space-y-4 overflow-y-auto border-r bg-background p-4 md:block">
                    <Skeleton className="h-6 w-28" />
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-3 rounded-lg border p-3">
                            <Skeleton className="size-8 rounded-md" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                    ))}
                </aside>

                <main className="flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden bg-muted/20 p-4 sm:p-8">
                    <Skeleton className="aspect-[1.414/1] w-full max-w-5xl rounded-md shadow-sm" />
                </main>

                <aside className="hidden h-full w-80 shrink-0 space-y-5 overflow-y-auto border-l bg-background p-5 lg:block">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-36" />
                        <Skeleton className="h-4 w-56" />
                    </div>

                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="space-y-3 rounded-lg border p-4">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full rounded-md" />
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>
                    ))}
                </aside>
            </div>
        </div>
    );
}
