"use client";

import { toAbsoluteRect } from "@/lib/helpers/dimensions-conversions";
import { getPlaceholderTypeMeta } from "@/lib/helpers/placeholder-type";
import { ListPlaceholdersResponse } from "@/types/placeholders.types";
import { GetTemplateResponse } from "@/types/templates.types";

type TemplateThumbnailProps = {
    template: GetTemplateResponse;
    placeholders: ListPlaceholdersResponse;
};

function TemplateThumbnail({
    template,
    placeholders,
}: TemplateThumbnailProps) {
    const thumbnailWidth = 500;
    const thumbnailHeight =
        thumbnailWidth * (template.height / template.width);

    return (
        <div className="w-full overflow-x-auto md:overflow-visible">
            <div
                className="relative overflow-hidden rounded-xl border border-border/80 bg-muted/30 shadow-md ring-1 ring-border/60"
                style={{
                    width: thumbnailWidth,
                    height: thumbnailHeight,
                }}
            >
                <img
                    src={template.presignedUrl}
                    alt={template.name}
                    className="h-full w-full object-contain"
                />

                {placeholders.map((placeholder, index) => {
                    const rect = toAbsoluteRect(
                        placeholder.x,
                        placeholder.y,
                        placeholder.width,
                        placeholder.height,
                        thumbnailWidth,
                        thumbnailHeight
                    );
                    const meta = getPlaceholderTypeMeta(placeholder.type);

                    return (
                        <div
                            key={placeholder.id}
                            className={`absolute flex items-center justify-center rounded border-2 ${meta.borderClass} ${meta.backgroundClass} shadow-sm`}
                            style={{
                                left: rect.x,
                                top: rect.y,
                                width: rect.width,
                                height: rect.height,
                            }}
                        >
                            <span
                                className="flex size-5 items-center justify-center rounded-full border border-black bg-white text-[11px] font-semibold leading-none text-black shadow-sm"
                            >
                                {index + 1}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TemplateThumbnail;
