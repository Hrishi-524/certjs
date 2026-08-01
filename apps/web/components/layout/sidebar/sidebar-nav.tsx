"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import { sidebarGroups } from "@/components/data/sidebar-items";
import { AppIcon } from "@/components/shared/app-icon";
import { cn } from "@/lib/utils";

function SidebarNav() {
    const pathname = usePathname();

    return (
        <SidebarContent className="w-full gap-1 px-2">
            {sidebarGroups.map((group) => (
                <SidebarGroup
                    key={group.label}
                    className="border-b px-0 py-3 last:border-none first:pt-4"
                >
                    <SidebarGroupLabel className="h-6 px-2 text-xs font-medium uppercase tracking-wide text-sidebar-foreground/55">
                        {group.label}
                    </SidebarGroupLabel>

                    <SidebarMenu className="gap-1">
                        {group.items.map((item) => {
                            const isActive =
                                pathname === item.href ||
                                pathname.startsWith(`${item.href}/`);

                            return (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                        isActive={isActive}
                                        className={cn(
                                            "h-9 rounded-lg text-[13px] font-medium transition-colors [&_svg]:size-4",
                                            isActive &&
                                                "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm ring-1 ring-sidebar-border"
                                        )}
                                    >
                                        <Link href={item.href}>
                                            <AppIcon icon={item.icon} />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </SidebarContent>
    )
}

export default SidebarNav
