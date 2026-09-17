"use client";

import { useTemplate } from '@/hooks/use-template';
import { usePlaceholders } from '@/hooks/use-placeholders';
import TemplateOverview from '@/components/playground/template-overview';
import { PlaygroundSkeleton } from '@/components/skeletons/playground-skeleton';
import { useState } from 'react';
import { parsedUploadedData } from '@/lib/helpers/data-conversions';
import type {UploadedRow} from '@/types/components/playground.types';
import type { ValidationResult } from '@/types/components/playground.types';
import type { JobSemantics } from '@/types/jobs.types';
import UploadData from './upload-data';
import { validateUpload } from '@/lib/helpers/validate-upload';
import ValidationCard from './validation-card';
import { usePlaygroundPreview } from '@/hooks/use-playground-preview';
import PreviewCard from './preview-card';
import { useCreateBatchJob } from '@/hooks/use-create-batch-job';
import { useRouter } from 'next/navigation';
import GenerateCard from './generate-card';
import CertificateDeliverySettings from './certificate-delivery-settings';

type PlaygroundPageProps = {
    templateId: string;
};

type PlaygroundStep = "upload" | "settings" | "validation" | "preview";

function createDefaultSettings(rows: UploadedRow[]): JobSemantics {
    const fields = rows.length > 0 ? Object.keys(rows[0]) : [];
    const emailField =
        fields.find((field) => field.toLowerCase().includes("email")) ??
        fields[0] ??
        "";

    return {
        deliveries: [
            {
                channel: "email",
                scope: "recipient",
                destination: emailField ? [emailField] : [],
                content: {
                    body: "",
                },
                artifact: "certificate",
            },
        ],
        identification: {
            fields: fields.length > 0 ? [fields[0]] : [],
            separator: " ",
            case: "preserve",
            collision: "suffix",
            docId: false,
        },
    };
}

function PlaygroundPage({ templateId }: PlaygroundPageProps) {
    const router = useRouter();

    const { data: template, isLoading: isTemplateLoading } = useTemplate(templateId);
    const { data: placeholders, isLoading: isPlaceholdersLoading } = usePlaceholders(templateId);
    const { mutateAsync: loadPreview, data: previewUrl, isPending: isPreviewLoading } = usePlaygroundPreview();
    const { mutateAsync: enqueueJob, isPending: isEnqueuing } = useCreateBatchJob();
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [uploadedData, setUploadedData] = useState<UploadedRow[]>([]);
    const [certificateSettings, setCertificateSettings] =
        useState<JobSemantics | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);    
    const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
    const [selectedRow, setSelectedRow] = useState(0); // for certificate preview, default to first row
    const [currentStep, setCurrentStep] = useState<PlaygroundStep>("upload");
    // const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    // const [isPreviewLoading, setIsPreviewLoading] = useState(false);
    const sanitizedRows = validationResult
        ? validationResult.sanitizedData
        : [];

    
    if(isTemplateLoading || isPlaceholdersLoading) return <PlaygroundSkeleton />
    

    const handlePrevious = async () => {
        if (!validationResult || selectedRow === 0) return;

        const newRow = selectedRow - 1;
        setSelectedRow(newRow);

        await loadPreview({
            templateId,
            recipient: sanitizedRows[newRow],
        });
    };

    async function handleCreateBatchJob() {
        if (!validationResult || !certificateSettings) return;

        const job = await enqueueJob({
            templateId,
            recipients: sanitizedRows,
            semantics: certificateSettings,
            idempotencyKey: crypto.randomUUID(),
        });

        router.push(`/dashboard/jobs/${job.jobId}`);
    }
    
    const handleNext = async () => {
        if (
            !validationResult ||
            selectedRow >= sanitizedRows.length - 1
        ) {
            return;
        }

        const newRow = selectedRow + 1;
        setSelectedRow(newRow);

        await loadPreview({
            templateId,
            recipient: sanitizedRows[newRow],
        });
    };
    
    const handleUpload = async (files: File[]) => {
        if (files.length === 0) return;

        const file = files[0];
        setIsUploading(true);
        setUploadError(null);
        setUploadedData([]);
        setCertificateSettings(null);
        setValidationResult(null);
        setSelectedRow(0);
        setCurrentStep("upload");
        // setPreviewUrl(null);

        try {
            const rows = await parsedUploadedData(file);

            setUploadedFile(file);
            setUploadedData(rows);
            setCertificateSettings(createDefaultSettings(rows));
            setCurrentStep("settings");
        } catch (err) {
            setUploadError(
                err instanceof Error ? err.message : "Upload failed."
            );
        } finally {
            setIsUploading(false);
        }
    };

    const handleValidateSettings = () => {
        if (!certificateSettings) return;

        const vResult = validateUpload(
            uploadedData,
            placeholders!,
            certificateSettings
        );

        setValidationResult(vResult);
        setSelectedRow(0);
        setCurrentStep("validation");
    };

    const handleContinue = async () => {
        if (!validationResult || sanitizedRows.length === 0) {
            return;
        }

        setCurrentStep("preview");

        await loadPreview({
            templateId,
            recipient: sanitizedRows[0],
        });
    }

    const uploadedFields =
        uploadedData.length > 0 ? Object.keys(uploadedData[0]) : [];

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
                            Upload, configure, validate, preview, and generate certificates for this template.
                        </p>
                    </div>
                    <div className="hidden items-center gap-2 text-xs font-medium text-muted-foreground md:flex">
                        <span>Upload</span>
                        <span className="h-px w-5 bg-border" />
                        <span>Settings</span>
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
                {currentStep !== "upload" && certificateSettings && (
                    <CertificateDeliverySettings
                        fields={uploadedFields}
                        value={certificateSettings}
                        onChange={(nextSettings) => {
                            setCertificateSettings(nextSettings);
                            setValidationResult(null);
                            setCurrentStep("settings");
                        }}
                        onContinue={handleValidateSettings}
                    />
                )}
                {validationResult && currentStep !== "settings" && (
                    <ValidationCard
                        validation={validationResult}
                        rows={uploadedData}
                        usableRows={sanitizedRows}
                        onContinue={handleContinue}
                    />
                )}
                {validationResult && currentStep === "preview" && sanitizedRows.length > 0 && (
                    <PreviewCard
                        rows={sanitizedRows}
                        selectedRow={selectedRow}
                        previewUrl={previewUrl}
                        isLoading={isPreviewLoading}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                    />
                )}
            </section>

            {validationResult && currentStep === "preview" && sanitizedRows.length > 0 && (
                <GenerateCard
                    recipientCount={sanitizedRows.length}
                    isGenerating={isEnqueuing}
                    onGenerate={handleCreateBatchJob}
                />
            )}
        </div>
    )
}

export default PlaygroundPage
