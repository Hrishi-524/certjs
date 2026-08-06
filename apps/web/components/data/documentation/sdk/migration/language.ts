export const BEFORE_SNIPPET = `await fetch(
    "/api/v1/jobs",
    {
        method: "POST",
        headers: {
            "X-Api-Key": apiKey,
        },
        body: JSON.stringify({
            recipients,
        }),
    }
);`;

export const AFTER_SNIPPET = `await certjs.generate({
    recipients,
});`;