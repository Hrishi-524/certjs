"use client";

import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/shared/app-icon";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppTheme } from "@/hooks/use-app-theme";

type ThemeToggleProps = {
    showLabel?: boolean;
};

export function ThemeToggle({
    showLabel = false,
}: ThemeToggleProps) {
    const {
        mounted,
        icon,
        label,
        toggleTheme,
    } = useAppTheme();

    if (!mounted) {
        return showLabel ? (
            <Skeleton className="h-10 w-24 rounded-md" />
        ) : (
            <Skeleton className="size-10 rounded-md" />
        );
    }

    return (
        <Button
            variant="ghost"
            size={showLabel ? "default" : "icon"}
            onClick={toggleTheme}
            aria-label={label}
            title={label}
        >
            <AppIcon icon={icon} />

            {showLabel && (
                <span className="ml-2">
                    {label}
                </span>
            )}
        </Button>
    );
}