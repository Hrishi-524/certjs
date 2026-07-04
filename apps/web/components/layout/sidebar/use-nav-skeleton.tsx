import { Skeleton } from "@/components/ui/skeleton";

export default function UserNavSkeleton() {
    return (
        <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />

            <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
            </div>
        </div>
    );
}