import { DashboardSquare01Icon } from "@hugeicons/core-free-icons";

export type SidebarItem = {
    title: string;
    href: string;
    icon: typeof DashboardSquare01Icon;
}

export type SidebarGroup = {
    label: string;
    items: SidebarItem[];
}