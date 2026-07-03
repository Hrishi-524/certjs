import { ApiError } from "@/lib/api/errors";
import { toast } from "sonner";

export function handleApiError(error: unknown) {
    if (error instanceof ApiError) {
        toast.error(error.message);
        return;
    }

    toast.error("Something went wrong.");
}