import { Skeleton } from "@/components/ui/skeleton";

export function TemplateCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
            <Skeleton className="aspect-video w-full rounded-none" />

            <div className="space-y-3 p-5">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>

            <div className="space-y-2 p-5 pt-0">
                <Skeleton className="h-9 w-full rounded-md" />
                <Skeleton className="h-9 w-full rounded-md" />
                <Skeleton className="h-9 w-full rounded-md" />
            </div>
        </div>
    );
}

export function TemplatesSkeleton() {
    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
            <div className="space-y-6 text-center">
                <div className="mx-auto space-y-3">
                    <Skeleton className="mx-auto h-10 w-56" />
                    <Skeleton className="mx-auto h-5 w-96 max-w-full" />
                </div>
                <Skeleton className="mx-auto h-11 w-full max-w-xl rounded-md" />
            </div>

            <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <TemplateCardSkeleton key={index} />
                ))}
            </div>
        </main>
    );
}
