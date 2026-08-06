export const JAVASCRIPT_SNIPPET = `const apiKey = process.env.CERTJS_API_KEY;

const jobId = "YOUR_JOB_ID";

const response = await fetch(
    \`https://api.certjs.hrishi-developer.in/api/v1/jobs/\${jobId}/download\`,
    {
        headers: {
            "X-Api-Key": apiKey!,
        },
    }
);

const download = await response.json();

console.log(download.presignedZipUrl);`;

export const PYTHON_SNIPPET = `import os
import requests

job_id = "YOUR_JOB_ID"

response = requests.get(
    f"https://api.certjs.hrishi-developer.in/api/v1/jobs/{job_id}/download",
    headers={
        "X-Api-Key": os.environ["CERTJS_API_KEY"],
    },
)

print(response.json()["presignedZipUrl"])`;

export const JAVA_SNIPPET = `String jobId = "YOUR_JOB_ID";

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.certjs.hrishi-developer.in/api/v1/jobs/" + jobId + "/download"))
    .header("X-Api-Key", System.getenv("CERTJS_API_KEY"))
    .GET()
    .build();

HttpResponse<String> response =
    client.send(request, HttpResponse.BodyHandlers.ofString());

System.out.println(response.body());`;

export const C_SHARP_SNIPPET = `using System.Net.Http;

var client = new HttpClient();

client.DefaultRequestHeaders.Add(
    "X-Api-Key",
    Environment.GetEnvironmentVariable("CERTJS_API_KEY")
);

var jobId = "YOUR_JOB_ID";

var response = await client.GetAsync(
    $"https://api.certjs.hrishi-developer.in/api/v1/jobs/{jobId}/download"
);

Console.WriteLine(await response.Content.ReadAsStringAsync());`;

export const CPP_SNIPPET = `const std::string jobId = "YOUR_JOB_ID";

// GET
// https://api.certjs.hrishi-developer.in/api/v1/jobs/{jobId}/download
//
// Header:
// X-Api-Key: <CERTJS_API_KEY>`;

export const R_SNIPPET = `library(httr2)

job_id <- "YOUR_JOB_ID"

request(
    paste0(
        "https://api.certjs.hrishi-developer.in/api/v1/jobs/",
        job_id,
        "/download"
    )
) |>
    req_headers(
        "X-Api-Key" = Sys.getenv("CERTJS_API_KEY")
    ) |>
    req_perform() |>
    resp_body_json()`;

export const TERMINAL_SNIPPET = `curl \
    https://api.certjs.hrishi-developer.in/api/v1/jobs/YOUR_JOB_ID/download \
    -H "X-Api-Key: $CERTJS_API_KEY"`