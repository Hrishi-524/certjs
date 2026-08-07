import {
    BookOpen01Icon,
    DashboardBrowsingIcon,
    File01Icon,
    PackageIcon,
    Structure05Icon,
    GithubIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export type NavbarItem = {
    label: string;
    href: string;
    icon?: typeof BookOpen01Icon;
    external?: boolean;
    disabled?: boolean;
};

export const NAVBAR_ITEMS: NavbarItem[] = [
    {
        label: "Docs",
        href: "/docs",
        icon: BookOpen01Icon,
    },
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: DashboardBrowsingIcon,
    },
    {
        label: "Get Config",
        href: "/get-config",
        icon: File01Icon,
    },
    {
        label: "SDK",
        href: "/sdk",
        icon: PackageIcon,
        disabled: true,
    },
    {
        label: "Architecture",
        href: "/architecture",
        icon: Structure05Icon,
    },
    {
        label: "Contribute",
        href: "https://github.com/Hrishi-524/certjs",
        icon: GithubIcon,
        external: true,
    },
];