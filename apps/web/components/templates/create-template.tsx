"use client"
import Dropzone from 'react-dropzone'
import { Upload, UploadIcon } from '@hugeicons/core-free-icons';
import { AppIcon } from '../shared/app-icon';
import { getDimensions } from '@/lib/upload/get-dimensions';
import { uploadTemplate } from '@/lib/api/templates';
import { useState } from 'react';
import { GetDimensionsResponse, UploadTemplateInput, UploadTemplateResponse } from '@/types/templates.types';
import { getTemplateName } from '@/lib/upload/get-template-name';
import UploadDropzone from '@/components/templates/upload-dropzone';
import UploadPreview from '@/components/templates/upload-preview';
import UploadActions from '@/components/templates/upload-actions';
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {Input} from '@/components/ui/input'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"
import { useRouter } from "next/navigation";

function CreateTemplate() {
    const router = useRouter();
    const [templateName, setTemplateName] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [file, setFile] = useState<File | null>(null);
    const [uploaded, setUploaded] = useState<boolean>(false)
    const [dimensions, setDimensions] = useState<GetDimensionsResponse | null>(null);
    const [creating, setCreating] = useState<boolean>(false)

    async function handleDrop(files: File[]) {
        const file = files[0];
        if(!file) {
            setError("File not provided")
            return
        }
        setFile(file)

        const dimensions: GetDimensionsResponse = await getDimensions(file);
        setDimensions(dimensions)

        if(templateName === "") {
            setTemplateName(getTemplateName(file.name))
        }

        console.log("Template uplaoded, following is the information")
        console.log("templateName", templateName)
        console.log("dimensions", dimensions)
        console.log("file", file)

        setUploaded(true)
    }

    async function handleCreate() {
        if (!file || !dimensions) {
            toast.error("Please upload a template first");
            return;
        }
        setCreating(true);

        if (!templateName.trim()) {
            toast.error("Please enter a template name");
            return;
        }

        const input: UploadTemplateInput = {
            template: file,
            name: templateName,
            width: dimensions!.width,
            height: dimensions!.height
        }

        const response: UploadTemplateResponse = await uploadTemplate(input)

        setCreating(false);
        console.log("Template created successfully, following is the response")
        console.log(response)

        toast.success("Template created successfully")
        router.push(`/dashboard/templates/${response.templateId}`);
    }
    
    return (
        <div className="mx-auto w-full max-w-7xl px-8 py-8 space-y-8">

            <div className="w-[1000px]">
                <UploadDropzone
                    handleDrop={handleDrop}
                />
            </div>
            {file && uploaded && (
                <div className="grid lg:grid-cols-[2fr_1fr] items-start">
                    <UploadPreview file={file}/>

                    <UploadActions
                        templateName={templateName}
                        onTemplateNameChange={setTemplateName}
                        onCreate={handleCreate}
                        dimensions={dimensions!}
                        templateType={file.type}
                        creating={creating}
                    />
                </div>
            )}
        </div>
    )
}

export default CreateTemplate