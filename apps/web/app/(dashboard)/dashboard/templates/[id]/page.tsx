import Editor from "@/components/editor/editor";

async function page({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return (
        <Editor templateId={resolvedParams.id} />
    )
}

export default page