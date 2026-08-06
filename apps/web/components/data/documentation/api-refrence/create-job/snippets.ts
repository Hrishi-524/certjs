export const C_SHARP_SNIPPET = `using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

var apiKey = Environment.GetEnvironmentVariable("CERTJS_API_KEY");

using var client = new HttpClient();

client.DefaultRequestHeaders.Add("X-Api-Key", apiKey);

var payload = new
{
    templateId = "YOUR_TEMPLATE_ID",
    recipients = new[]
    {
        new
        {
            name = "John Doe",
            score = 98
        }
    },
    idempotencyKey = Guid.NewGuid()
};

var response = await client.PostAsync(
    "https://api.certjs.hrishi-developer.in/api/v1/jobs",
    new StringContent(
        JsonSerializer.Serialize(payload),
        Encoding.UTF8,
        "application/json"
    )
);

Console.WriteLine(await response.Content.ReadAsStringAsync());`

export const CPP_SNIPPET = `#include <cstdlib>
#include <iostream>

#include <cpr/cpr.h>
#include <nlohmann/json.hpp>

int main() {
    const char* apiKey = std::getenv("CERTJS_API_KEY");

    nlohmann::json body = {
        {"templateId", "YOUR_TEMPLATE_ID"},
        {"recipients", {{
            {"name", "John Doe"},
            {"score", 98}
        }}},
        {"idempotencyKey", "GENERATE_UUID"}
    };

    auto response = cpr::Post(
        cpr::Url{
            "https://api.certjs.hrishi-developer.in/api/v1/jobs"
        },
        cpr::Header{
            {"Content-Type", "application/json"},
            {"X-Api-Key", apiKey}
        },
        cpr::Body{body.dump()}
    );

    std::cout << response.text << std::endl;
}`

export const JAVA_SNIPPET = `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.UUID;

String apiKey = System.getenv("CERTJS_API_KEY");

String body = """
{
  "templateId": "YOUR_TEMPLATE_ID",
  "recipients": [
    {
      "name": "John Doe",
      "score": 98
    }
  ],
  "idempotencyKey": "%s"
}
""".formatted(UUID.randomUUID());

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.certjs.hrishi-developer.in/api/v1/jobs"))
    .header("Content-Type", "application/json")
    .header("X-Api-Key", apiKey)
    .POST(HttpRequest.BodyPublishers.ofString(body))
    .build();

HttpClient client = HttpClient.newHttpClient();

HttpResponse<String> response =
    client.send(request, HttpResponse.BodyHandlers.ofString());

System.out.println(response.body());`

export const JAVASCRIPT_SNIPPET = `const apiKey = process.env.CERTJS_API_KEY;

const response = await fetch(
    "https://api.certjs.hrishi-developer.in/api/v1/jobs",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": apiKey!,
        },
        body: JSON.stringify({
            templateId: "YOUR_TEMPLATE_ID",
            recipients: [
                {
                    name: "John Doe",
                    score: 98,
                },
            ],
            idempotencyKey: crypto.randomUUID(),
        }),
    }
);

const {
    jobId,
    status,
    totalCount,
    processedCount,
} = await response.json();

console.log({
    jobId,
    status,
    totalCount,
    processedCount,
});`

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

export const R_SNIPPET = `library(httr2)

api_key <- Sys.getenv("CERTJS_API_KEY")

response <-
  request("https://api.certjs.hrishi-developer.in/api/v1/jobs") |>
  req_headers(
    "X-Api-Key" = api_key
  ) |>
  req_body_json(list(
    templateId = "YOUR_TEMPLATE_ID",
    recipients = list(
      list(
        name = "John Doe",
        score = 98
      )
    ),
    idempotencyKey = as.character(uuid::UUIDgenerate())
  )) |>
  req_perform()

resp_body_json(response)`

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

