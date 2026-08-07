import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PlaygroundSkeleton() {
    return (
        <main className="mx-auto w-full max-w-7xl space-y-5 px-6 py-6 lg:px-8">
            <Card>
                <CardContent className="grid gap-5 p-5 lg:grid-cols-[280px_minmax(0,1fr)]">
                    <Skeleton className="aspect-video w-full rounded-md" />
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Skeleton className="h-7 w-56" />
                            <Skeleton className="h-4 w-80 max-w-full" />
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="space-y-2 rounded-lg border p-3">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-6 w-12" />
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="space-y-5">
                    <Card>
                        <CardHeader className="space-y-2">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-4 w-72 max-w-full" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-40 w-full rounded-md" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="space-y-2">
                            <Skeleton className="h-6 w-36" />
                            <Skeleton className="h-4 w-64 max-w-full" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="aspect-video w-full rounded-md" />
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-5">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Card key={index}>
                            <CardContent className="space-y-3 p-5">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-4/5" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <Card>
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-72 max-w-full" />
                    </div>
                    <Skeleton className="h-10 w-full rounded-md sm:w-36" />
                </CardContent>
            </Card>
        </main>
    );
}
