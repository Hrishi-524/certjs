"use client";

import { useTemplate } from '@/hooks/use-template';
import { usePlaceholders } from '@/hooks/use-placeholders';
import TemplateOverview from '@/components/playground/template-overview';
import PlaygroundPageSkeleton from './playground-page-skeleton';

type PlaygroundPageProps = {
    templateId: string;
};

function PlaygroundPage({ templateId }: PlaygroundPageProps) {
    const { data: template, isLoading: isTemplateLoading } = useTemplate(templateId);
    const { data: placeholders, isLoading: isPlaceholdersLoading } = usePlaceholders(templateId);

    if(isTemplateLoading || isPlaceholdersLoading) return <PlaygroundPageSkeleton />


    return (
        <div>
            <TemplateOverview 
                template={template!} 
                placeholders={placeholders!} 
            />
        </div>
    )
}

export default PlaygroundPage