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