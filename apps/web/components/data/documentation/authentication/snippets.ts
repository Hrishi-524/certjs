export const CPP_AUTH_SNIPPET = `#include <cstdlib>

const char* apiKey = std::getenv("CERTJS_API_KEY");

// Add the following header when making your HTTP request:
// X-Api-Key: <apiKey>`;

export const C_SHARP_AUTH_SNIPPET = `using System.Net.Http;

var client = new HttpClient();

client.DefaultRequestHeaders.Add(
    "X-Api-Key",
    Environment.GetEnvironmentVariable("CERTJS_API_KEY")
);

var response = await client.GetAsync(
    "https://api.certjs.hrishi-developer.in/api/v1/..."
);`;

export const JAVA_AUTH_SNIPPET = `HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.certjs.hrishi-developer.in/api/v1/..."))
    .header("X-Api-Key", System.getenv("CERTJS_API_KEY"))
    .GET()
    .build();`;

export const JAVASCRIPT_AUTH_SNIPPET = `const apiKey = process.env.CERTJS_API_KEY;

const response = await fetch("https://api.certjs.hrishi-developer.in/api/v1/...", {
    headers: {
        "X-Api-Key": apiKey!,
    },
});`;

export const PYTHON_AUTH_SNIPPET = `import os
import requests

response = requests.get(
    "https://api.certjs.hrishi-developer.in/api/v1/...",
    headers={
        "X-Api-Key": os.environ["CERTJS_API_KEY"],
    },
)`;

export const R_AUTH_SNIPPET = `library(httr2)

request("https://api.certjs.hrishi-developer.in/api/v1/...") |>
    req_headers(
        "X-Api-Key" = Sys.getenv("CERTJS_API_KEY")
    ) |>
    req_perform()`;


    export const TERMINAL_AUTH_SNIPPET = `export CERTJS_API_KEY="<your-api-key>"

curl https://api.certjs.hrishi-developer.in/api/v1/... \\
    -H "X-Api-Key: $CERTJS_API_KEY"`;

