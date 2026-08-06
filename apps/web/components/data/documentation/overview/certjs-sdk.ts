import {
    ArrowRight01Icon,
    PackageIcon,
} from "@hugeicons/core-free-icons";

export const CERTJS_SDK = {
    title: "CertJS SDK",

    description:
        "The CertJS SDK enables local certificate generation by bundling your template and configuration directly into your application. Unlike the REST API, your certificate templates do not need to be stored on CertJS servers.",

    icon: PackageIcon,

    npm: "@certjs/sdk",

    templateModel: {
        title: "Template Privacy",

        description:
            "Instead of referencing a Template ID, the SDK uses your certificate template together with a generated certjs.config.json file. This allows applications to generate certificates without uploading template assets to the CertJS cloud.",
    },

    capabilities: [
        {
            title: "Local Template Management",
            description:
                "Bundle certificate templates with your application instead of storing them remotely.",
        },
        {
            title: "Configuration Driven",
            description:
                "Use certjs.config.json to describe placeholders, dimensions and rendering configuration.",
        },
        {
            title: "First-Class SDK",
            description:
                "Designed for JavaScript first, with additional language support planned.",
        },
    ],

    cta: {
        title: "View SDK Documentation",
        href: "#sdk-reference",
        icon: ArrowRight01Icon,
    },
} as const;