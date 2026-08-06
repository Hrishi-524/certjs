// components/data/documentation/certjs-api.ts

import {
    ApiIcon,
    ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

export const CERTJS_API = {
    title: "CertJS REST API",

    description:
        "The CertJS REST API allows applications to generate, monitor, and retrieve certificates using HTTPS endpoints. Every request is authenticated using an API Key and returns JSON responses.",

    icon: ApiIcon,

    baseUrl: "https://api.certjs.hrishi-developer.in",

    authentication: {
        header: "X-Api-Key",
        contentType: "application/json",
    },

    capabilities: [
        {
            title: "Create Job",
            description:
                "Submit one or more recipients for certificate generation.",
            href: "#create-job",
        },
        {
            title: "Track Progress",
            description:
                "Poll the job until certificate generation is complete.",
            href: "#get-job-status",
        },
        {
            title: "Retrieve Documents",
            description:
                "Download generated certificates individually or as a ZIP archive.",
            href: "#get-job-documents",
        },
        {
            title: "Verify Certificate",
            description:
                "Validate certificate authenticity using its verification token.",
            href: "#verify-certificate",
        },
    ],

    cta: {
        title: "View API Reference",
        href: "#api-reference",
        icon: ArrowRight01Icon,
    },
} as const;