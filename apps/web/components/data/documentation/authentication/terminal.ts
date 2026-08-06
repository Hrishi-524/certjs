export const TERMINAL_AUTH_SNIPPET = `export CERTJS_API_KEY="<your-api-key>"

curl https://api.certjs.hrishi-developer.in/api/v1/... \\
    -H "X-Api-Key: $CERTJS_API_KEY"`;