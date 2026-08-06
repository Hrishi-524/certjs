"use client";

type GuideSectionProps = {
    title: string;
    description?: string;
};

export default function GuideSection({
    title,
    description,
}: GuideSectionProps) {
    return (
        <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight">
                {title}
            </h2>

            {description && (
                <p className="max-w-3xl text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    );
}