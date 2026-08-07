export const WORKFLOW = {
    title: "Choose Your Workflow",

    description:
        "Use the hosted dashboard for managed templates or generate a local configuration for complete ownership.",

    dashboard: {
        title: "Dashboard Workflow",

        description:
            "Best for teams managing templates and issuing certificates through the CertJS cloud.",

        steps: [
            "Upload Certificate",
            "Edit Placeholders",
            "Save Template",
            "Generate Template ID",
            "Issue Certificates via API",
        ],
    },

    local: {
        title: "Local SDK Workflow",

        description:
            "Ideal for privacy-focused projects where templates never leave your environment.",

        steps: [
            "Upload Certificate",
            "Edit Placeholders",
            "Download certjs.config.json",
            "Commit to Repository",
            "Generate Certificates Locally",
        ],
    },

    footer:
        "Both workflows support the same placeholder editor while serving different deployment needs.",
} as const;