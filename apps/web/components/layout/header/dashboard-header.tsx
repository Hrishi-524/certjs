"use client"
import useMe from "@/hooks/use-me"
import UserNavSkeleton from "../sidebar/use-nav-skeleton";

function DashboardHeader() {
    const { data, isLoading } = useMe(); 
     if (isLoading) {
        return <UserNavSkeleton />
    }

    if (!data) {
        return null
    }

    const { user } = data

    return (
        <div>Hi, {user.name}!,
        Manage templates, monitor jobs and issue certificates.</div>
    )
}

export default DashboardHeader