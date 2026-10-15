export type Entry = Record<string, string | number>;

export type JobSemantics = {
    deliveries: {
        channel: "email" | "webhook";
        scope: "recipient" | "batch";
        destination: string[];
        content: {
            sender: string | null;
            subject: string;
            body: string;
            data?: Entry[] | null;
        }| null;
    }[];
    identification: {
        fields: string[];
        separator?: string; // default " "
        case?: "lower" | "upper" | "preserve"; // default "preserve"
        collision?: "prefix" | "suffix"; // default "suffix"
        docId?: boolean; // default false
    };
    dashboardPersistence: boolean;
};