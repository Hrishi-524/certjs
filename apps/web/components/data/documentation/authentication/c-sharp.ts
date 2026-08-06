export const C_SHARP_AUTH_SNIPPET = `using System.Net.Http;

var client = new HttpClient();

client.DefaultRequestHeaders.Add(
    "X-Api-Key",
    Environment.GetEnvironmentVariable("CERTJS_API_KEY")
);

var response = await client.GetAsync(
    "https://api.certjs.hrishi-developer.in/api/v1/..."
);`;