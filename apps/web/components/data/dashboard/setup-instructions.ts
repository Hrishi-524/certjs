// components/data/dashboard-setup.ts

export const dashboardSetupSteps = [
    {
        key: "hasTemplate",
        label: "Upload a template",
        href: "/dashboard/templates/new",
    },
    {
        key: "hasApiKey",
        label: "Create an API key",
        href: "/dashboard/api-keys",
    },
    {
        key: "hasGeneratedBatch",
        label: "Generate your first batch",
        href: "/dashboard/playground",
    },
] as const;