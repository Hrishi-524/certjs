"use client";

import DocumentationTable from "./documentation-table";

export type ErrorResponse = {
    status: number;
    title: string;
    description: string;
};

type ErrorsCardProps = {
    errors: readonly ErrorResponse[];

    title?: string;
    description?: string;
};

export default function ErrorsCard({
    errors,
    title = "Error Responses",
    description = "Common errors returned by this endpoint.",
}: ErrorsCardProps) {
    return (
        <DocumentationTable
            title={title}
            description={description}
            rows={errors}
            columns={[
                {
                    header: "Status",
                    accessor: "status",
                },
                {
                    header: "Error",
                    accessor: "title",
                },
                {
                    header: "Description",
                    accessor: "description",
                },
            ]}
        />
    );
}