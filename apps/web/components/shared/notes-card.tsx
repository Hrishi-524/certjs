"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type NotesCardProps = {
    notes: readonly string[];

    title?: string;
    description?: string;
};

export default function NotesCard({
    notes,
    title = "Notes",
    description,
}: NotesCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>

                {description && (
                    <CardDescription>
                        {description}
                    </CardDescription>
                )}
            </CardHeader>

            <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    {notes.map((note) => (
                        <li key={note}>
                            {note}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}