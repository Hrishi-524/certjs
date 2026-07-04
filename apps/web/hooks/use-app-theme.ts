"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
    Moon01Icon,
    Sun01Icon,
} from "@hugeicons/core-free-icons";

export function useAppTheme() {
    const {
        theme,
        resolvedTheme,
        systemTheme,
        setTheme,
    } = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = resolvedTheme === "dark";

    return {
        mounted,
        theme,
        resolvedTheme,
        systemTheme,
        isDark,
        icon: isDark ? Sun01Icon : Moon01Icon,
        label: isDark ? "Light Mode" : "Dark Mode",
        toggleTheme: () =>
            setTheme(isDark ? "light" : "dark"),
    };
}