export const JAVA_SNIPPET = `String jobId = "YOUR_JOB_ID";

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.certjs.hrishi-developer.in/api/v1/jobs/" + jobId + "/documents"))
    .header("X-Api-Key", System.getenv("CERTJS_API_KEY"))
    .GET()
    .build();

HttpResponse<String> response =
    client.send(request, HttpResponse.BodyHandlers.ofString());

System.out.println(response.body());`;