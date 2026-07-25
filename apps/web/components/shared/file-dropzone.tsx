import React from 'react'
import Dropzone, { type Accept } from 'react-dropzone'
import { AppIcon } from '@/components/shared/app-icon';
import { cn } from '@/lib/utils';

type UploadDropzoneProps = {
    title: string;
    description: string;
    icon: React.ComponentProps<typeof AppIcon>["icon"];
    accept: Accept;
    onDrop: (files: File[]) => void;
};

function FileDropzone({ title, description, icon, accept, onDrop }: UploadDropzoneProps) {
    return (
        <Dropzone
            onDrop={onDrop}
            multiple={false}
            maxFiles={1}
            accept={accept}
        >
            {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragReject,
                isFocused,
            }) => (
                <div
                    {...getRootProps()}
                    className={cn(
                        "mx-auto flex h-56 max-w-5xl cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed px-12 transition-colors",
                        "border-border bg-muted/30 hover:bg-muted/60",

                        isFocused && "ring-2 ring-cyan-500",

                        isDragActive && "border-cyan-500 bg-cyan-500/5",

                        isDragReject && "border-destructive bg-destructive/5"
                    )}
                >
                    <div className='align-center flex flex-col items-center justify-center text-center'>
                        <AppIcon
                            icon={icon}
                            className={cn(
                                "mb-5 h-10 w-10",
                                isDragReject
                                    ? "text-destructive"
                                    : isDragActive
                                    ? "text-cyan-500"
                                    : "text-muted-foreground"
                            )}
                        />

                        <p className="text-xl font-semibold">
                            {isDragReject
                                ? "Unsupported file type"
                                : isDragActive
                                    ? "Drop file here"
                                    : title}
                        </p>

                        <p className="mt-2 text-muted-foreground">
                            {isDragReject
                                ? description
                                : isDragActive
                                    ? "Release to upload"
                                    : description}
                        </p>
                        <input {...getInputProps()} />
                    </div>
                </div>
            )}
        </Dropzone>
    )
}

export default FileDropzone