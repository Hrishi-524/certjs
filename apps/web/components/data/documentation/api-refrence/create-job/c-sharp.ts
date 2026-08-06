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