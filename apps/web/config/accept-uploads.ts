import type { Accept } from "react-dropzone";

export const UPLOAD_CONFIG = {
    template: {
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
            "image/svg+xml": [".svg"],
        } satisfies Accept,
    },

    data: {
        accept: {
            "text/csv": [".csv"],
            "application/json": [".json"],
            "application/vnd.ms-excel": [".xls"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
        } satisfies Accept,
    },
} as const;