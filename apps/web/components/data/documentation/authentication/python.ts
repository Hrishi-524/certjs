export const PYTHON_AUTH_SNIPPET = `import os
import requests

response = requests.get(
    "https://api.certjs.hrishi-developer.in/api/v1/...",
    headers={
        "X-Api-Key": os.environ["CERTJS_API_KEY"],
    },
)`;