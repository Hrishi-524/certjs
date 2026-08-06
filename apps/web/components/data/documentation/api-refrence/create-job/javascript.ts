export const JAVASCRIPT_SNIPPET = `const apiKey = process.env.CERTJS_API_KEY;

const response = await fetch(
    "https://api.certjs.hrishi-developer.in/api/v1/jobs",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": apiKey!,
        },
        body: JSON.stringify({
            templateId: "YOUR_TEMPLATE_ID",
            recipients: [
                {
                    name: "John Doe",
                    score: 98,
                },
            ],
            idempotencyKey: crypto.randomUUID(),
        }),
    }
);

const {
    jobId,
    status,
    totalCount,
    processedCount,
} = await response.json();

console.log({
    jobId,
    status,
    totalCount,
    processedCount,
});`