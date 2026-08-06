export const PYTHON_SNIPPET = `import os
import requests

job_id = "YOUR_JOB_ID"

response = requests.get(
    f"https://api.certjs.hrishi-developer.in/api/v1/jobs/{job_id}",
    headers={
        "X-Api-Key": os.environ["CERTJS_API_KEY"],
    },
)

print(response.json())`;