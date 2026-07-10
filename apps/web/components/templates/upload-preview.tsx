import {
    Card,
    CardContent,
} from "@/components/ui/card";

type UploadPreviewProps = {
    file: File;
};

export function UploadPreview({ file }: UploadPreviewProps) {
    return (
        <Card className="h-auto max-h-[500px] w-auto max-w-[600px]">
            <CardContent className="h-full">
                <div className="flex h-full min-h-0 items-center justify-center rounded-sm border bg-muted">
                    <img
                        src={URL.createObjectURL(file)}
                        alt="Template preview"
                        className="rounded-md object-contain"
                    />
                </div>
            </CardContent>
        </Card>
    );
}
export default UploadPreview