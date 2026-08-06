export const R_SNIPPET = `library(httr2)

job_id <- "YOUR_JOB_ID"

request(
    paste0(
        "https://api.certjs.hrishi-developer.in/api/v1/jobs/",
        job_id,
        "/documents"
    )
) |>
    req_headers(
        "X-Api-Key" = Sys.getenv("CERTJS_API_KEY")
    ) |>
    req_perform() |>
    resp_body_json()`;