"use client";

import ApiReference from "./api-refrence";
import Authentication from "./authentication";
import Overview from "./overview";

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