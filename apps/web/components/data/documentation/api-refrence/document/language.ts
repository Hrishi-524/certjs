export const JAVASCRIPT_SNIPPET = `const apiKey = process.env.CERTJS_API_KEY;

const documentId = "YOUR_DOCUMENT_ID";

const response = await fetch(
    \`https://api.certjs.hrishi-developer.in/api/v1/documents/\${documentId}\`,
    {
        headers: {
            "X-Api-Key": apiKey!,
        },
    }
);

const document = await response.json();

console.log(document);`;

export const PYTHON_SNIPPET = `import os
import requests

document_id = "YOUR_DOCUMENT_ID"

response = requests.get(
    f"https://api.certjs.hrishi-developer.in/api/v1/documents/{document_id}",
    headers={
        "X-Api-Key": os.environ["CERTJS_API_KEY"],
    },
)

print(response.json())`;

export const JAVA_SNIPPET = `String documentId = "YOUR_DOCUMENT_ID";

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.certjs.hrishi-developer.in/api/v1/documents/" + documentId))
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

var documentId = "YOUR_DOCUMENT_ID";

var response = await client.GetAsync(
    $"https://api.certjs.hrishi-developer.in/api/v1/documents/{documentId}"
);

Console.WriteLine(await response.Content.ReadAsStringAsync());`;

export const CPP_SNIPPET = `const std::string documentId = "YOUR_DOCUMENT_ID";

// GET
// https://api.certjs.hrishi-developer.in/api/v1/documents/{documentId}
//
// Header:
// X-Api-Key: <CERTJS_API_KEY>`;

export const R_SNIPPET = `library(httr2)

document_id <- "YOUR_DOCUMENT_ID"

request(
    paste0(
        "https://api.certjs.hrishi-developer.in/api/v1/documents/",
        document_id
    )
) |>
    req_headers(
        "X-Api-Key" = Sys.getenv("CERTJS_API_KEY")
    ) |>
    req_perform() |>
    resp_body_json()`;

export const TERMINAL_SNIPPET = `curl \
    https://api.certjs.hrishi-developer.in/api/v1/documents/YOUR_DOCUMENT_ID \
    -H "X-Api-Key: $CERTJS_API_KEY"`;

export const GET_DOCUMENT_RESPONSE = `{
    "id": "34fd7d4e-...",
    "jobId": "c5f0b9c8-...",
    "recipientData": {
        "name": "John Doe",
        "score": 98
    },
    "status": "completed",
    "error": null,
    "verifyToken": "8a2d1efc...",
    "s3Url": "https://...",
    "createdAt": "2026-08-06T15:30:12.000Z",
    "jobStatus": "completed",
    "templateId": "cb4d7d5f-..."
}`;