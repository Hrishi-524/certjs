"use client";

import type { ReactNode } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export type DocumentationTableColumn<T> = {
    header: string;
    accessor: keyof T;
    className?: string;
    render?: (value: T[keyof T], row: T) => ReactNode;
};

export type DocumentationTableProps<T> = {
    title?: string;
    description?: string;
    columns: readonly DocumentationTableColumn<T>[];
    rows: readonly T[];
};

export default function DocumentationTable<T extends object>({
    title,
    description,
    columns,
    rows,
}: DocumentationTableProps<T>) {
    return (
        <Card>
            {(title || description) && (
                <CardHeader>
                    {title && (
                        <CardTitle>{title}</CardTitle>
                    )}

                    {description && (
                        <CardDescription>
                            {description}
                        </CardDescription>
                    )}
                </CardHeader>
            )}

            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b">
                            <tr>
                                {columns.map((column) => (
                                    <th
                                        key={String(column.accessor)}
                                        className={`py-3 text-left font-medium ${column.className ?? ""}`}
                                    >
                                        {column.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {rows.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className="border-b last:border-none"
                                >
                                    {columns.map((column) => {
                                        const value =
                                            row[column.accessor];

                                        return (
                                            <td
                                                key={String(
                                                    column.accessor
                                                )}
                                                className={`py-4 align-top ${column.className ?? ""}`}
                                            >
                                                {column.render
                                                    ? column.render(
                                                          value,
                                                          row
                                                      )
                                                    : String(
                                                          value
                                                      )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}