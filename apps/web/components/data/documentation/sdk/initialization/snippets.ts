export const JAVASCRIPT_SNIPPET = `import { CertJS } from "@certjs/sdk";

const certjs = new CertJS({
    apiKey: process.env.CERTJS_API_KEY!,
});`;

export const PYTHON_SNIPPET = `from certjs import CertJS
import os

certjs = CertJS(
    api_key=os.environ["CERTJS_API_KEY"]
)`;

export const JAVA_SNIPPET = `CertJS certjs = new CertJS(
    System.getenv("CERTJS_API_KEY")
);`;

export const C_SHARP_SNIPPET = `using CertJS;

var certjs = new CertJS(
    Environment.GetEnvironmentVariable("CERTJS_API_KEY")!
);`;