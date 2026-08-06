export const API_TEMPLATE_SNIPPET = `const certjs = new CertJS({
    apiKey: process.env.CERTJS_API_KEY!,
    templateId: "YOUR_TEMPLATE_ID",
});`;

export const LOCAL_TEMPLATE_SNIPPET = `const certjs = new CertJS({
    template: "./certificate.pdf",
    config: "./certjs.config.json",
});`;