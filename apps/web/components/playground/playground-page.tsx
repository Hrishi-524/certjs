"use client";

import { useTemplate } from '@/hooks/use-template';
import { usePlaceholders } from '@/hooks/use-placeholders';
import TemplateOverview from '@/components/playground/template-overview';
import PlaygroundPageSkeleton from './playground-page-skeleton';
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

    
    if(isTemplateLoading || isPlaceholdersLoading) return <PlaygroundPageSkeleton />
    

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
        <div>
            <TemplateOverview 
                template={template!} 
                placeholders={placeholders!} 
            />
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
                <>
                    <PreviewCard
                        rows={validationResult.validRows}
                        selectedRow={selectedRow}
                        previewUrl={previewUrl}
                        isLoading={isPreviewLoading}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                    />

                    <GenerateCard
                        recipientCount={validationResult.validRows.length}
                        isGenerating={isEnqueuing}
                        onGenerate={handleCreateBatchJob}
                    />
                </>
            )}
        </div>
    )
}

export default PlaygroundPage