export const R_AUTH_SNIPPET = `library(httr2)

request("https://api.certjs.hrishi-developer.in/api/v1/...") |>
    req_headers(
        "X-Api-Key" = Sys.getenv("CERTJS_API_KEY")
    ) |>
    req_perform()`;