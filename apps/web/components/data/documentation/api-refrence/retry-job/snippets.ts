export const JAVASCRIPT_SNIPPET = `const apiKey = process.env.CERTJS_API_KEY;

const jobId = "YOUR_JOB_ID";

const response = await fetch(
    \`https://api.certjs.hrishi-developer.in/api/v1/jobs/\${jobId}/retry\`,
    {
        method: "POST",
        headers: {
            "X-Api-Key": apiKey!,
        },
    }
);

const result = await response.json();

console.log(result);`;

export const PYTHON_SNIPPET = `import os
import requests

job_id = "YOUR_JOB_ID"

response = requests.post(
    f"https://api.certjs.hrishi-developer.in/api/v1/jobs/{job_id}/retry",
    headers={
        "X-Api-Key": os.environ["CERTJS_API_KEY"],
    },
)

print(response.json())`;

export const JAVA_SNIPPET = `String jobId = "YOUR_JOB_ID";

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.certjs.hrishi-developer.in/api/v1/jobs/" + jobId + "/retry"))
    .header("X-Api-Key", System.getenv("CERTJS_API_KEY"))
    .POST(HttpRequest.BodyPublishers.noBody())
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

var response = await client.PostAsync(
    $"https://api.certjs.hrishi-developer.in/api/v1/jobs/{jobId}/retry",
    null
);

Console.WriteLine(await response.Content.ReadAsStringAsync());`;

export const CPP_SNIPPET = `const std::string jobId = "YOUR_JOB_ID";

// POST
// https://api.certjs.hrishi-developer.in/api/v1/jobs/{jobId}/retry
//
// Header:
// X-Api-Key: <CERTJS_API_KEY>`;

export const R_SNIPPET = `library(httr2)

job_id <- "YOUR_JOB_ID"

request(
    paste0(
        "https://api.certjs.hrishi-developer.in/api/v1/jobs/",
        job_id,
        "/retry"
    )
) |>
    req_headers(
        "X-Api-Key" = Sys.getenv("CERTJS_API_KEY")
    ) |>
    req_method("POST") |>
    req_perform() |>
    resp_body_json()`;

export const TERMINAL_SNIPPET = `curl -X POST \
    https://api.certjs.hrishi-developer.in/api/v1/jobs/YOUR_JOB_ID/retry \
    -H "X-Api-Key: $CERTJS_API_KEY"`;

