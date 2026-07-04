"use client";

import { HugeiconsIcon } from "@hugeicons/react"
import { Moon01Icon, Sun01Icon } from "@hugeicons/core-free-icons"
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
            }
        >
            {theme === "dark" ? <HugeiconsIcon icon={Sun01Icon} /> : <HugeiconsIcon icon={Moon01Icon} />}
        </button>
    );
}