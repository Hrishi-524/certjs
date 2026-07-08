import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

export function AppIcon(props: React.ComponentProps<typeof HugeiconsIcon>) {
    return (
        <HugeiconsIcon
            strokeWidth={2}
            size={20}
            {...props}
        />
    );
}