export const JAVA_AUTH_SNIPPET = `HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.certjs.hrishi-developer.in/api/v1/..."))
    .header("X-Api-Key", System.getenv("CERTJS_API_KEY"))
    .GET()
    .build();`;