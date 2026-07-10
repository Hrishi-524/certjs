import type { GetDimensionsResponse } from "@/types/templates.types";

export async function getDimensions(file: File) {
    return new Promise<GetDimensionsResponse>((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            resolve({
                width: img.naturalWidth,
                height: img.naturalHeight,
            });

            URL.revokeObjectURL(img.src);
        };

        img.onerror = reject;

        img.src = URL.createObjectURL(file);
    });
}