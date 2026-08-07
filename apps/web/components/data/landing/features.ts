import {
    ApiIcon,
    SecurityLockIcon,
    TaskDone01Icon,
    PackageIcon,
    FileSyncIcon,
    CloudUploadIcon,
} from "@hugeicons/core-free-icons";

export const FEATURES = [
    {
        title: "REST API",
        description:
            "Generate and manage certificate batches through a simple HTTP API.",
        icon: ApiIcon,
    },
    {
        title: "Dashboard Editor",
        description:
            "Visually design templates with drag-and-drop placeholder editing.",
        icon: CloudUploadIcon,
    },
    {
        title: "Verification",
        description:
            "Verify generated certificates using secure verification tokens.",
        icon: SecurityLockIcon,
    },
    {
        title: "Batch Processing",
        description:
            "Generate thousands of certificates asynchronously using background jobs.",
        icon: TaskDone01Icon,
    },
    {
        title: "JavaScript SDK",
        description:
            "Generate certificates directly inside your application without using the hosted dashboard.",
        icon: PackageIcon,
    },
    {
        title: "Flexible Workflows",
        description:
            "Choose between cloud-managed templates and local configuration files.",
        icon: FileSyncIcon,
    },
] as const;