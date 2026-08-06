export const JAVASCRIPT_SNIPPET = `const apiKey = process.env.CERTJS_API_KEY;

const jobId = "YOUR_JOB_ID";

const response = await fetch(
    \`https://api.certjs.hrishi-developer.in/api/v1/jobs/\${jobId}\`,
    {
        headers: {
            "X-Api-Key": apiKey!,
        },
    }
);

const job = await response.json();

console.log(job);`;