"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ListPlaceholdersResponse } from "@/types/placeholders.types";
import { GetTemplateResponse } from "@/types/templates.types";
import TemplateThumbnail from "./template-thumbnail";
import TemplateInfo from "./template-info";

type TemplateOverviewProps = {
    template: GetTemplateResponse;
    placeholders: ListPlaceholdersResponse;
};

function TemplateOverview({ template, placeholders }: TemplateOverviewProps) {
    return (
        <div className="grid gap-5 rounded-lg border bg-card p-4 text-card-foreground shadow-sm md:grid-cols-[minmax(480px,520px)_1fr] md:items-start md:gap-6 md:p-5">
            <div className="space-y-3">
                <TemplateThumbnail template={template} placeholders={placeholders} />
                <div className="grid grid-cols-2 gap-3">
                    <Button asChild>
                        <Link href={`/dashboard/templates/${template.templateId}`}>
                            View in editor
                        </Link>
                    </Button>
                    <Button variant="outline" type="button">
                        Preview
                    </Button>
                </div>
            </div>
            <TemplateInfo template={template} placeholders={placeholders} />
        </div>
    );
}

export default TemplateOverview;
