import PlaygroundPage from '@/components/playground/playground-page'

async function page({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
  return (
    <PlaygroundPage templateId={resolvedParams.id} />
  )
}

export default page