import { Suspense } from "react";
import AuthCallbackClient from "./auth-callback-client";

export const dynamic = "force-dynamic";

export default function Page() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center">
                    <p>Signing you in, please wait...</p>
                </div>
            }
        >
            <AuthCallbackClient />
        </Suspense>
    );
}