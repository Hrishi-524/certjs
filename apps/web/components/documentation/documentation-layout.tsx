"use client";

import type { ReactNode } from "react";

import DocumentationSidebar from "./documentation-sidebar";
import DocumentationTOC from "./documentation-toc";

type DocumentationLayoutProps = {
    children: ReactNode;
};

export default function DocumentationLayout({
    children,
}: DocumentationLayoutProps) {
    return (
        <div className="mx-auto grid w-full max-w-[1500px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8 xl:grid-cols-[260px_minmax(0,1fr)_220px] 2xl:px-10">
            <aside className="hidden min-w-0 lg:block">
                <DocumentationSidebar />
            </aside>

            <main className="min-w-0">
                {children}
            </main>

            <aside className="hidden min-w-0 xl:block">
                <DocumentationTOC />
            </aside>
        </div>
    );
}
