"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AppIcon } from "@/components/shared/app-icon";
import { useAppTheme } from "@/hooks/use-app-theme";

export function ThemeButton() {
    const {
        mounted,
        icon,
        label,
        toggleTheme,
    } = useAppTheme();

    if (!mounted) {
        return (
            <Button
                variant="ghost"
                className="w-full justify-start"
                disabled
            >
                <Skeleton className="h-5 w-20" />
            </Button>
        );
    }

    return (
        <Button
            variant="ghost"
            onClick={toggleTheme}
        >
            <AppIcon icon={icon} />
            <span>{label}</span>
        </Button>
    );
}