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