"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { setAccessToken } from "@/lib/auth/token-storage";

export default function AuthCallbackClient() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const accessToken = searchParams.get("accessToken");

        if (!accessToken) {
            router.replace("/login");
            return;
        }

        setAccessToken(accessToken);

        router.replace("/dashboard");
    }, [router, searchParams]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <p>Signing you in, please wait...</p>
        </div>
    );
}