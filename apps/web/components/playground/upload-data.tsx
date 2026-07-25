"use client";

import Dropzone from "react-dropzone";
import { AppIcon } from "@/components/shared/app-icon";
import { Button } from "@/components/ui/button";
import { UPLOAD_CONFIG } from "@/config/accept-uploads";
import { cn } from "@/lib/utils";
import {
    CheckmarkCircle02Icon,
    FileSpreadsheetIcon,
    UploadIcon,
} from "@hugeicons/core-free-icons";

type UploadDataProps = {
    file: File | null;
    isUploading: boolean;
    error: string | null;
    onUpload: (file: File[]) => void;
}

const supportedFormats = ["CSV", "Excel (.xlsx, .xls)", "JSON"];
const uploadNotes = [
    "Maximum 1 file",
    "Data stays in your browser until generation",
    "Parsed automatically after upload",
];

function formatFileSize(size: number) {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function UploadData({ file, isUploading, error, onUpload }: UploadDataProps) {
    return (
        <section className="mx-auto w-full max-w-7xl px-8 pb-8">
            <div className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
                <div className="mb-5 flex items-center justify-between gap-4 border-b pb-4">
                    <div>
                        <h2 className="text-base font-semibold">Upload Data</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Add the recipient dataset for this template.
                        </p>
                    </div>
                    <span className="shrink-0 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                        Step 1/4
                    </span>
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(360px,420px)_1fr] lg:items-center">
                    <Dropzone
                        onDrop={onUpload}
                        multiple={false}
                        maxFiles={1}
                        accept={UPLOAD_CONFIG.data.accept}
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
                                    "group flex min-h-48 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition-all duration-200",
                                    "border-border bg-muted/20 hover:-translate-y-0.5 hover:border-cyan-500/70 hover:bg-cyan-500/5",
                                    isFocused && "ring-2 ring-cyan-500/60 ring-offset-2 ring-offset-background",
                                    isDragActive && "scale-[1.01] border-cyan-500 bg-cyan-500/10 shadow-sm shadow-cyan-500/10",
                                    isDragReject && "border-destructive bg-destructive/5"
                                )}
                            >
                                <input {...getInputProps()} />

                                {file ? (
                                    <div className="flex w-full max-w-xs flex-col items-center">
                                        <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
                                            <AppIcon icon={FileSpreadsheetIcon} className="size-5" />
                                        </div>
                                        <p className="max-w-full truncate text-sm font-semibold">
                                            {file.name}
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {formatFileSize(file.size)}
                                        </p>
                                        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500">
                                            <AppIcon icon={CheckmarkCircle02Icon} className="size-3.5" />
                                            Ready to validate
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="mt-5"
                                        >
                                            Change File
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex max-w-xs flex-col items-center">
                                        <div
                                            className={cn(
                                                "mb-4 flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-all duration-200 group-hover:bg-cyan-500/10 group-hover:text-cyan-500",
                                                isDragActive && "translate-y-1 bg-cyan-500/10 text-cyan-500",
                                                isDragReject && "bg-destructive/10 text-destructive"
                                            )}
                                        >
                                            <AppIcon icon={UploadIcon} className="size-5" />
                                        </div>
                                        <p className="text-sm font-semibold">
                                            {isUploading
                                                ? "Parsing file..."
                                                : isDragReject
                                                    ? "Unsupported file type"
                                                    : isDragActive
                                                        ? "Drop file here"
                                                        : "Drag & drop your dataset"}
                                        </p>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {isDragActive && !isDragReject
                                                ? "Release to upload"
                                                : "or click to browse"}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </Dropzone>

                    <div className="space-y-5 rounded-lg bg-muted/20 p-4">
                        <div>
                            <h3 className="text-sm font-semibold">Supported Formats</h3>
                            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                                {supportedFormats.map((format) => (
                                    <li key={format} className="flex items-center gap-2">
                                        <AppIcon
                                            icon={CheckmarkCircle02Icon}
                                            className="size-4 text-cyan-500"
                                        />
                                        <span>{format}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {uploadNotes.map((note) => (
                                <li key={note} className="flex gap-2">
                                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                                    <span>{note}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {error ? (
                    <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                        {error}
                    </p>
                ) : null}
            </div>
        </section>
    )
}

export default UploadData
