"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useMe from "@/hooks/use-me";

import { AuthProvider } from "@/contexts/auth-context";
import { DashboardLayoutSkeleton } from "@/components/skeletons/dashboard-skeleton";

export default function DashboardProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const {
        data,
        isLoading,
        isError,
    } = useMe();

    useEffect(() => {
        if (
            !isLoading &&
            (isError || !data?.user)
        ) {
            router.replace("/login");
        }
    }, [
        isLoading,
        isError,
        data,
        router,
    ]);

    if (isLoading) {
        return <DashboardLayoutSkeleton />;
    }

    if (!data?.user) {
        return null;
    }

    return (
        <AuthProvider user={data.user}>
            {children}
        </AuthProvider>
    );
}
