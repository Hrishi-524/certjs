// types/dashboard.types.ts

/*
Entire reference structure for DashboardResponse :-
{
    "stats": {
        "templates": 0,
        "jobs": 0,
        "apiKeys": 0,
        "documents": 0
    },
    "setup": {
        "hasTemplate": false,
        "hasApiKey": false,
        "hasGeneratedBatch": false
    },
    "activeJobs": [{
        "id": "string",
        "status": "pending" | "processing" | "completed" | "failed",
        "processedCount": 0,
        "totalCount": 0,
        "failedCount": 0,
        "template": {
            "id": "string",
            "name": "string"
        }
        createdAt: "2023-08-30T12:34:56.789Z"
    }],
    "recentJobs": [{
        "id": "string",
        "status": "pending" | "processing" | "completed" | "failed",
        "processedCount": 0,
        "totalCount": 0,
        "failedCount": 0,
        "template": {
            "id": "string",
            "name": "string"
        },
        "createdAt": "2023-08-30T12:34:56.789Z",
        "completedAt": "2023-08-30T12:34:56.789Z"
    }],
    "recentTemplates": [{
        "id": "string",
        "userId": "string",
        "name": "string",
        "version": 0,
        "isActive": true,
        "width": 0,
        "height": 0,
        "createdAt": "2023-08-30T12:34:56.789Z",
        "updatedAt": "2023-08-30T12:34:56.789Z",
        "presignedUrl": "string"
    }]
}
*/
export type DashboardStats = {
    templates: number;
    jobs: number;
    apiKeys: number;
    documents: number;
};

export type DashboardSetup = {
    hasTemplate: boolean;
    hasApiKey: boolean;
    hasGeneratedBatch: boolean;
};

export type DashboardJob = {
    id: string;
    status: "pending" | "processing" | "completed" | "failed";
    processedCount: number;
    totalCount: number;
    failedCount: number;

    template: {
        id: string;
        name: string;
    };

    createdAt: string;
};

export type DashboardRecentJob = DashboardJob & {
    completedAt: string;
};

export type DashboardRecentTemplate = {
    id: string;
    userId: string;
    name: string;
    version: number;
    isActive: boolean;
    width: number | null;
    height: number | null;
    createdAt: string;
    updatedAt: string;

    presignedUrl: string;
};

export type DashboardResponse = {
    stats: DashboardStats;

    setup: DashboardSetup;

    activeJobs: DashboardJob[];

    recentJobs: DashboardRecentJob[];

    recentTemplates: DashboardRecentTemplate[];
};