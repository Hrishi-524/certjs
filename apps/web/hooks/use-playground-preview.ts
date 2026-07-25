import { useMutation } from "@tanstack/react-query";
import { getPlaygroundPreview } from "@/lib/api/jobs";
import type { PlaygroundPreviewInput } from "@/types/jobs.types";

export function usePlaygroundPreview() {
    return useMutation({
        mutationFn: (input: PlaygroundPreviewInput) =>
            getPlaygroundPreview(input),
    });
}