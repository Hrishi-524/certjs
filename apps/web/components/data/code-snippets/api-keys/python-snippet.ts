export const PYTHON_SNIPPET = `import os
import uuid
import requests

response = requests.post(
    "https://api.certjs.hrishi-developer.in/api/v1/jobs",
    headers={
        "X-Api-Key": os.environ["CERTJS_API_KEY"],
    },
    json={
        "templateId": "YOUR_TEMPLATE_ID",
        "recipients": [
            {
                "name": "John Doe",
                "score": 98,
            }
        ],
        "idempotencyKey": str(uuid.uuid4()),
    },
)

print(response.json());`