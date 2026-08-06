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