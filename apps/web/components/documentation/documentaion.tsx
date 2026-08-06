"use client";

import ApiReference from "./api-refrence/api-refrence";
import Authentication from "./authentication/authentication";
import Overview from "./overview/overview";

import { Separator } from "@/components/ui/separator";

export default function Documentation() {
    return (
        <main className="space-y-20">
            <Overview />
                <Separator />
            <Authentication />
                <Separator />
            <ApiReference />

            {/* SDK Reference */}

            {/* Error Codes */}

            {/* Changelog */}
        </main>
    );
}