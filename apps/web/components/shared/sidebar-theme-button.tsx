"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AppIcon } from "@/components/shared/app-icon";
import { useAppTheme } from "@/hooks/use-app-theme";
import { SidebarMenuButton } from "@/components/ui/sidebar";

export function SidebarThemeButton() {
    const {
        mounted,
        icon,
        label,
        toggleTheme,
    } = useAppTheme();

    if (!mounted) {
        return (
            <SidebarMenuButton
                size="sm"
                className="h-10 rounded-lg px-2.5 text-[15px] font-medium [&_svg]:size-5"
            >
                <Skeleton className="h-5 w-20" />
            </SidebarMenuButton>
        );
    }

    return (
        <SidebarMenuButton
            size="sm"
            className="h-10 rounded-lg px-2.5 text-[15px] font-medium [&_svg]:size-5"
            onClick={toggleTheme}
        >
            <AppIcon icon={icon} />
            <span>{label}</span>
        </SidebarMenuButton>
    );
}