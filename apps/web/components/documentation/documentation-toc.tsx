"use client";

import Link from "next/link";

import { DOCUMENTATION_SIDEBAR } from "@/components/data/documentation/sidebar";
import { cn } from "@/lib/utils";

import { useDocumentationScrollSpy } from "./use-documentation-scroll-spy";

const ITEMS = DOCUMENTATION_SIDEBAR.flatMap((section) => section.items);

export default function DocumentationTOC() {
    const {
        activeId,
        handleLinkClick,
        resolveTargetId,
    } = useDocumentationScrollSpy();

    return (
        <nav className="sticky top-20 max-h-[calc(100vh-5rem)] space-y-4 overflow-y-auto pr-2">
            <h3 className="text-sm font-semibold">
                On this page
            </h3>

            <div className="space-y-1">
                {ITEMS.map((item) => {
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
                                "relative block rounded-md border-l-2 border-transparent px-2 py-1 text-sm text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground",
                                isActive && "border-primary bg-muted/70 pl-3 font-medium text-foreground"
                            )}
                        >
                            {item.title}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
