"use client";

import Overview from "./overview";
import Authentication from "./authentication";
import ApiReference from "./api-reference";
import SDK from "./sdk";

export default function DocumentationContent() {
    return (
        <div className="space-y-24 [&_section[id]]:scroll-mt-24">
            <Overview />

            <Authentication />

            <ApiReference />

            <SDK />
        </div>
    );
}
