export type DocumentationSidebarItem = {
    title: string;
    href: string;
};

export type DocumentationSidebarSection = {
    title: string;
    items: DocumentationSidebarItem[];
};

export const DOCUMENTATION_SIDEBAR: DocumentationSidebarSection[] = [
    {
        title: "Overview",
        items: [
            {
                title: "Getting Started",
                href: "#getting-started",
            },
            {
                title: "CertJS API",
                href: "#api",
            },
            {
                title: "CertJS SDK",
                href: "#certjs-sdk",
            },
            {
                title: "Capabilities",
                href: "#capabilities",
            },
        ],
    },
    {
        title: "Authentication",
        items: [
            {
                title: "API Keys",
                href: "#authentication",
            },
        ],
    },
    {
        title: "REST API",
        items: [
            {
                title: "Create Job",
                href: "#create-job",
            },
            {
                title: "Get Job Status",
                href: "#get-job-status",
            },
            {
                title: "Download Job ZIP",
                href: "#download-job-zip",
            },
            {
                title: "Retry Job",
                href: "#retry-job",
            },
            {
                title: "Get Job Documents",
                href: "#get-job-documents",
            },
            {
                title: "Get Document",
                href: "#get-document",
            },
        ],
    },
    {
        title: "SDK",
        items: [
            {
                title: "Installation",
                href: "#installation",
            },
            {
                title: "Initialization",
                href: "#initialization",
            },
            {
                title: "Template Configuration",
                href: "#template-configuration",
            },
            {
                title: "Generate Certificates",
                href: "#generate",
            },
            {
                title: "Verification",
                href: "#verification",
            },
            {
                title: "Configuration",
                href: "#configuration",
            },
            {
                title: "Webhooks",
                href: "#webhooks",
            },
            {
                title: "Migration",
                href: "#migration",
            },
        ],
    },
];
