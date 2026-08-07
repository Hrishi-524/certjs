import {
    BookOpen01Icon,
    DashboardBrowsingIcon,
    File01Icon,
} from "@hugeicons/core-free-icons";

export const PRIMARY_ACTIONS = [
    {
        title: "Documentation",
        description:
            "Explore the REST API, SDK guides, authentication, and endpoint references.",
        href: "/docs",
        icon: BookOpen01Icon,
    },
    {
        title: "Dashboard",
        description:
            "Upload templates, manage certificates, monitor jobs, and create API Keys.",
        href: "/dashboard",
        icon: DashboardBrowsingIcon,
    },
    {
        title: "Get Config File",
        description:
            "Create template configuration locally without storing anything on the CertJS servers.",
        href: "/get-config",
        icon: File01Icon,
    },
] as const;