import {
    DashboardSquare01Icon,
    File01Icon,
    Task01Icon,
    Key01Icon,
    CodeIcon,
    BookOpen01Icon,
} from "@hugeicons/core-free-icons";
import type { SidebarGroup } from "@/types/components/sidebar.types";

export const sidebarGroups: SidebarGroup[] = [
    {
        label: "General",
        items: [
            {
                title: "Dashboard",
                href: "/dashboard",
                icon: DashboardSquare01Icon,
            },
        ]
    },
    {
        label: "Core",
        items: [
            {
                title: "Templates",
                href: "/dashboard/templates",
                icon: File01Icon,
            },
            {
                title: "Jobs",
                href: "/dashboard/jobs",
                icon: Task01Icon,
            },
            {
                title: "API Keys",
                href: "/dashboard/api-keys",
                icon: Key01Icon,
            },
        ]
    },
    {
        label: "Developer",
        items: [
            {
                title: "Playground",
                href: "/dashboard/playground",
                icon: CodeIcon,
            },
            {
                title: "Documentation",
                href: "/docs",
                icon: BookOpen01Icon,
            },
        ]
    }
]