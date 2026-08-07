import JobPage from '@/components/jobs/id-page/job-page';
async function page({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return (
        <JobPage jobId={resolvedParams.id} />
    )
}

export default page