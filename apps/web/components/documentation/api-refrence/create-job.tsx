"use client";

import AppCodeBlock from "@/components/shared/app-code-block";
import AppLanguageTabs from "@/components/shared/app-language-tabs";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { CREATE_JOB } from "@/components/data/documentation/api-refrence/create-job";
import DocumentationTable from "@/components/shared/documenation-table";

export default function CreateJob() {
    return (
        <section
            id="create-job"
            className="space-y-8"
        >
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <Badge variant="outline">
                        {CREATE_JOB.method}
                    </Badge>

                    <code className="rounded-md bg-muted px-2 py-1 font-mono text-sm">
                        {CREATE_JOB.path}
                    </code>
                </div>

                <div className="space-y-2">
                    <h2 className="text-3xl font-semibold tracking-tight">
                        {CREATE_JOB.title}
                    </h2>

                    <p className="max-w-3xl text-muted-foreground">
                        {CREATE_JOB.description}
                    </p>
                </div>
            </div>

            <AppLanguageTabs
                snippets={Object.values(CREATE_JOB.snippets)}
                codeBlockLabel="Request Example"
            />

            <Card>
                <CardHeader>
                    <CardTitle>Request Body</CardTitle>

                    <CardDescription>
                        Fields accepted by this endpoint.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                   <DocumentationTable
                        title="Request Body"
                        description="Fields accepted by this endpoint."
                        rows={CREATE_JOB.requestBody}
                        columns={[
                            {
                                header: "Parameter",
                                accessor: "field",
                                render: value => (
                                    <code>{value}</code>
                                ),
                            },
                            {
                                header: "Type",
                                accessor: "type",
                            },
                            {
                                header: "Required",
                                accessor: "required",
                                render: value => (
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
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Response{" "}
                        <span className="text-muted-foreground">
                            ({CREATE_JOB.response.status})
                        </span>
                    </CardTitle>

                    <CardDescription>
                        Returned immediately after the job is
                        accepted.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <AppCodeBlock
                        language="json"
                        label="201 Created"
                        code={CREATE_JOB.response.code}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Notes</CardTitle>
                </CardHeader>

                <CardContent>
                    <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                        {CREATE_JOB.notes.map((note) => (
                            <li key={note}>{note}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Error Responses</CardTitle>

                    <CardDescription>
                        Common errors returned by this endpoint.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b">
                                <tr className="text-left">
                                    <th className="py-3 pr-6 font-medium">
                                        Status
                                    </th>

                                    <th className="py-3 pr-6 font-medium">
                                        Error
                                    </th>

                                    <th className="py-3 font-medium">
                                        Description
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {CREATE_JOB.errors.map((error) => (
                                    <tr
                                        key={error.status}
                                        className="border-b last:border-none"
                                    >
                                        <td className="py-4 font-mono">
                                            {error.status}
                                        </td>

                                        <td className="py-4 font-medium">
                                            {error.title}
                                        </td>

                                        <td className="py-4 text-muted-foreground">
                                            {error.description}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}