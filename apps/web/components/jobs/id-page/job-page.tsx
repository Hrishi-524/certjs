"use client"

import { useBatchJob } from '@/hooks/use-batch-job'
import { useBatchJobDocuments } from '@/hooks/use-batch-job-documents'
import JobPageSketon from './job-page-sketon';
import JobHeader from './job-header';
import JobProgress from './job-progress';
import JobStatistics from './job-statistics';
import DownloadCard from './download-card';

export default function JobPage({ jobId }: { jobId: string }) {
    const { data: job, isLoading: isJobLoading, error: jobError } = useBatchJob(jobId);
    const { data: documents, isLoading: isDocumentsLoading, error: documentsError } = useBatchJobDocuments(jobId);
    const isCompleted = job?.status === "completed";
    const isProcessing = job?.status === "processing" || job?.status === "pending";
    const isFailed = job?.status === "failed";

    if(isJobLoading || isDocumentsLoading) return <JobPageSketon />;
    
    if (!job || !documents) return null;


    return (
        <div className="space-y-6">
            <JobHeader job={job} />

            <JobProgress job={job} />

            <JobStatistics job={job} />

            {isCompleted && (
                <DownloadCard job={job} />
            )}
            {/* 


            <JobDocumentsTable
                documents={documents}
                isLoading={isDocumentsLoading}
            /> */}
        </div>
    );
}