export const CPP_AUTH_SNIPPET = `#include <cstdlib>

const char* apiKey = std::getenv("CERTJS_API_KEY");

// Add the following header when making your HTTP request:
// X-Api-Key: <apiKey>`;