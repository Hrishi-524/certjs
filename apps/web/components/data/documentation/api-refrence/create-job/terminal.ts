export const TERMINAL_SNIPPET = `curl -X POST \
  "https://api.certjs.hrishi-developer.in/api/v1/jobs" \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: $CERTJS_API_KEY" \
  -d '{
    "templateId": "YOUR_TEMPLATE_ID",
    "recipients": [
      {
        "name": "John Doe",
        "score": 98
      }
    ],
    "idempotencyKey": "YOUR_IDEMPOTENCY_KEY"
}'`