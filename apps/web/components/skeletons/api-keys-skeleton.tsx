import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ApiKeyCardSkeleton() {
    return (
        <Card className="overflow-hidden border-border/70 shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between gap-4 px-5 py-5">
                <div className="min-w-0 space-y-2">
                    <div className="flex items-center gap-2">
                        <Skeleton className="size-8 rounded-lg" />
                        <Skeleton className="h-5 w-36" />
                    </div>
                    <Skeleton className="ml-10 h-3 w-28" />
                </div>

                <Skeleton className="h-6 w-16 rounded-full" />
            </CardHeader>

            <CardContent className="px-5 pb-5">
                <div className="space-y-3 rounded-lg border bg-muted/20 p-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-4"
                        >
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-4 w-32 justify-self-end" />
                        </div>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="flex gap-3 border-t bg-muted/10 px-5 py-4">
                <Skeleton className="h-10 flex-1 rounded-md" />
                <Skeleton className="size-10 rounded-md" />
            </CardFooter>
        </Card>
    );
}

export function ApiKeysContentSkeleton() {
    return (
        <div className="mx-auto w-full max-w-7xl space-y-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-9 w-40" />
                    <Skeleton className="h-5 w-80 max-w-full" />
                </div>
                <Skeleton className="h-10 w-full rounded-md sm:w-36" />
            </div>

            <Card>
                <CardHeader className="space-y-3">
                    <Skeleton className="h-6 w-36" />
                    <Skeleton className="h-4 w-72 max-w-full" />
                </CardHeader>
                <CardContent className="grid gap-4 lg:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="space-y-3 rounded-lg border p-4">
                            <Skeleton className="h-5 w-28" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                            <Skeleton className="h-9 w-full rounded-md" />
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                    <ApiKeyCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
}

export function ApiKeysSkeleton() {
    return (
        <main className="mx-auto w-full max-w-[112rem] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
            <ApiKeysContentSkeleton />
        </main>
    );
}
