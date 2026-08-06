"use client";

import { Badge } from "@/components/ui/badge";

import DocumentationTable from "./documentation-table";

export type Parameter = {
    field: string;
    type: string;
    required: boolean;
    description: string;
};

type RequestCardProps = {
    title?: string;
    description?: string;
    parameters: readonly Parameter[];
};

export default function ParametersCard({
    title = "Request Body",
    description = "Fields accepted by this endpoint.",
    parameters,
}: RequestCardProps) {
    return (
        <DocumentationTable
            title={title}
            description={description}
            rows={parameters}
            columns={[
                {
                    header: "Parameter",
                    accessor: "field",
                    render: (value) => (
                        <code className="font-mono">
                            {String(value)}
                        </code>
                    ),
                },
                {
                    header: "Type",
                    accessor: "type",
                },
                {
                    header: "Required",
                    accessor: "required",
                    render: (value) => (
                        <Badge
                            variant={
                                value
                                    ? "default"
                                    : "secondary"
                            }
                        >
                            {value
                                ? "Required"
                                : "Optional"}
                        </Badge>
                    ),
                },
                {
                    header: "Description",
                    accessor: "description",
                },
            ]}
        />
    );
}