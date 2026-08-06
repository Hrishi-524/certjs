export const JAVASCRIPT_AUTH_SNIPPET = `const apiKey = process.env.CERTJS_API_KEY;

const response = await fetch("https://api.certjs.hrishi-developer.in/api/v1/...", {
    headers: {
        "X-Api-Key": apiKey!,
    },
});`;