"use client";

import Link from "next/link";

import { DOCUMENTATION_SIDEBAR } from "@/components/data/documentation/sidebar";
import { cn } from "@/lib/utils";

import { useDocumentationScrollSpy } from "./use-documentation-scroll-spy";

export default function DocumentationSidebar() {
    const {
        activeId,
        handleLinkClick,
        resolveTargetId,
    } = useDocumentationScrollSpy();

    return (
        <nav className="sticky top-20 max-h-[calc(100vh-5rem)] space-y-8 overflow-y-auto pr-2">
            {DOCUMENTATION_SIDEBAR.map((section) => (
                <div
                    key={section.title}
                    className="space-y-2"
                >
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {section.title}
                    </h3>

                    <div className="space-y-1">
                        {section.items.map((item) => {
                            const targetId = resolveTargetId(item.href, item.title);
                            const isActive = activeId === targetId;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        handleLinkClick(item.href, item.title);
                                    }}
                                    className={cn(
                                        "relative block rounded-md border-l-2 border-transparent px-3 py-2 text-sm text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground",
                                        isActive && "border-primary bg-muted/70 pl-4 font-medium text-foreground"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ))}
        </nav>
    );
}
