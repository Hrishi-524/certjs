"use client";

import { useTemplate } from '@/hooks/use-template';
import { usePlaceholders } from '@/hooks/use-placeholders';
import TemplateOverview from '@/components/playground/template-overview';
import { PlaygroundSkeleton } from '@/components/skeletons/playground-skeleton';
import { useState } from 'react';
import { parsedUploadedData } from '@/lib/helpers/data-conversions';
import type {UploadedRow} from '@/types/components/playground.types';
import { ValidationResult } from '@/types/components/playground.types';
import UploadData from './upload-data';
import { validateUpload } from '@/lib/helpers/validate-upload';
import ValidationCard from './validation-card';
import { usePlaygroundPreview } from '@/hooks/use-playground-preview';
import PreviewCard from './preview-card';
import { useCreateBatchJob } from '@/hooks/use-create-batch-job';
import { useRouter } from 'next/navigation';
import GenerateCard from './generate-card';

type PlaygroundPageProps = {
    templateId: string;
};

function PlaygroundPage({ templateId }: PlaygroundPageProps) {
    const router = useRouter();

    const { data: template, isLoading: isTemplateLoading } = useTemplate(templateId);
    const { data: placeholders, isLoading: isPlaceholdersLoading } = usePlaceholders(templateId);
    const { mutateAsync: loadPreview, data: previewUrl, isPending: isPreviewLoading } = usePlaygroundPreview();
    const { mutateAsync: enqueueJob, isPending: isEnqueuing } = useCreateBatchJob();
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [_uploadedData, setUploadedData] = useState<UploadedRow[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);    
    const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
    const [selectedRow, setSelectedRow] = useState(0); // for certificate preview, default to first row
    const [_currentStep, setCurrentStep] = useState<"upload" | "preview">("upload");
    // const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    // const [isPreviewLoading, setIsPreviewLoading] = useState(false);

    
    if(isTemplateLoading || isPlaceholdersLoading) return <PlaygroundSkeleton />
    

    const handlePrevious = async () => {
        if (!validationResult || selectedRow === 0) return;

        const newRow = selectedRow - 1;
        setSelectedRow(newRow);

        await loadPreview({
            templateId,
            recipient: validationResult.validRows[newRow],
        });
    };

    async function handleCreateBatchJob() {
        if (!validationResult) return;

        const validRows = validationResult.validRows;

        const job = await enqueueJob({
            templateId,
            recipients: validRows,
            idempotencyKey: crypto.randomUUID(),
        });

        router.push(`/dashboard/jobs/${job.jobId}`);
    }
    
    const handleNext = async () => {
        if (
            !validationResult ||
            selectedRow >= validationResult.validRows.length - 1
        ) {
            return;
        }

        const newRow = selectedRow + 1;
        setSelectedRow(newRow);

        await loadPreview({
            templateId,
            recipient: validationResult.validRows[newRow],
        });
    };
    
    const handleUpload = async (files: File[]) => {
        if (files.length === 0) return;

        const file = files[0];
        setIsUploading(true);
        setUploadError(null);
        setUploadedData([]);
        setValidationResult(null);
        setSelectedRow(0);
        // setPreviewUrl(null);

        try {
            const rows = await parsedUploadedData(file);

            const vResult = validateUpload(rows, placeholders!);
            setValidationResult(vResult);
            
            setUploadedFile(file);
            setUploadedData(rows);
        } catch (err) {
            setUploadError(
                err instanceof Error ? err.message : "Upload failed."
            );
        } finally {
            setIsUploading(false);
        }
    };

    const handleContinue = () => {
        setCurrentStep("preview");  
    }

    return (
        <div className="mx-auto w-full max-w-7xl space-y-5 px-6 py-6 lg:px-8">
            <TemplateOverview 
                template={template!} 
                placeholders={placeholders!} 
            />

            <section className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-base font-semibold text-foreground">
                            Certificate Workflow
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Upload, validate, preview, and generate certificates for this template.
                        </p>
                    </div>
                    <div className="hidden items-center gap-2 text-xs font-medium text-muted-foreground md:flex">
                        <span>Upload</span>
                        <span className="h-px w-5 bg-border" />
                        <span>Validate</span>
                        <span className="h-px w-5 bg-border" />
                        <span>Preview</span>
                        <span className="h-px w-5 bg-border" />
                        <span>Generate</span>
                    </div>
                </div>

                <UploadData
                    file={uploadedFile}
                    isUploading={isUploading}
                    error={uploadError}
                    onUpload={handleUpload}
                />
                {validationResult && (
                    <ValidationCard validation={validationResult} onContinue={handleContinue} />
                )}
                {validationResult && validationResult.validRows.length > 0 && (
                    <PreviewCard
                        rows={validationResult.validRows}
                        selectedRow={selectedRow}
                        previewUrl={previewUrl}
                        isLoading={isPreviewLoading}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                    />
                )}
            </section>

            {validationResult && validationResult.validRows.length > 0 && (
                <GenerateCard
                    recipientCount={validationResult.validRows.length}
                    isGenerating={isEnqueuing}
                    onGenerate={handleCreateBatchJob}
                />
            )}
        </div>
    )
}

export default PlaygroundPage
