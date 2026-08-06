// components/data/code-snippets/documentation/getting-started.ts

import {
    ApiIcon,
    PackageIcon,
} from "@hugeicons/core-free-icons";

export const GETTING_STARTED = {
    title: "Getting Started",

    description:
        "Choose the integration method that best fits your application architecture.",

    integrations: [
        {
            id: "api",

            title: "REST API",

            description:
                "Store templates on CertJS and generate certificates through the cloud API using Template IDs.",

            icon: ApiIcon,

            cta: {
                label: "View API Reference",
                href: "#api-reference",
            },

            steps: [
                "Upload a certificate template.",
                "Edit placeholders.",
                "Save the template.",
                "Copy the generated Template ID.",
                "Create jobs using the REST API.",
            ],
        },

        {
            id: "sdk",

            title: "SDK",

            description:
                "Keep certificate templates inside your own project using certjs.config.json without storing them on CertJS servers.",

            icon: PackageIcon,

            cta: {
                label: "View SDK Documentation",
                href: "#sdk",
            },

            steps: [
                "Upload a certificate template.",
                "Edit placeholders.",
                "Download certjs.config.json.",
                "Add the template and configuration file to your project.",
                "Generate certificates locally through the SDK.",
            ],
        },
    ],
} as const;