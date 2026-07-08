"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu01Icon } from "@hugeicons/core-free-icons";
import { AppIcon } from "@/components/shared/app-icon";

export function SidebarToggle() {
    const { toggleSidebar } = useSidebar();

    return (
        <Button
            variant="ghost"
            size="lg"
            onClick={toggleSidebar}
        >
            <AppIcon icon={Menu01Icon} />
        </Button>
    );
}