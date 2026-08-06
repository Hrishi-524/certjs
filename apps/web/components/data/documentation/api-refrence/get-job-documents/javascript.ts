export const JAVASCRIPT_SNIPPET = `const apiKey = process.env.CERTJS_API_KEY;

const jobId = "YOUR_JOB_ID";

const response = await fetch(
    \`https://api.certjs.hrishi-developer.in/api/v1/jobs/\${jobId}/documents\`,
    {
        headers: {
            "X-Api-Key": apiKey!,
        },
    }
);

const documents = await response.json();

console.log(documents);`;