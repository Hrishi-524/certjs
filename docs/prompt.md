Update the CertJS frontend to support the latest JobSemantics schema and the new Email + Batch template-data flow.

IMPORTANT:
- Inspect the existing implementation before changing anything.
- Do not rewrite working components unnecessarily.
- Use the existing types as the source of truth.
- Preserve the existing Upload → Settings → Validate → Preview → Generate flow.
- Preserve the existing validation/sanitizedData behavior.
- Run TypeScript typecheck and ESLint after the changes.

## Updated semantics model

The delivery shape is now conceptually:

{
    channel: "email" | "webhook",
    scope: "recipient" | "batch",
    destination: [<value>],
    content: {
        sender: <value> | null,
        subject: <value>,
        body: <value>,
        data: [{<values>}] // only relevant for batch scope
    } | null
}

Important semantics:

### Email + recipient

Example:

{
    channel: "email",
    scope: "recipient",
    destination: ["gmail"],
    content: {
        sender: null,
        subject: "Certificate of Completion for {{course_name}}",
        body: "Dear {{student_name}}...",
        data: ...
    }
}

- The original uploaded recipient row is the source of template variables.
- DO NOT show another file upload for Email + Recipient.
- The destination references a field in the original uploaded data.
- Template variables such as {{student_name}} and {{course_name}} are resolved from the original recipient row.
- Missing template variables do NOT prevent delivery. They resolve to an empty string during rendering.

### Email + batch

Example:

{
    channel: "email",
    scope: "batch",
    destination: [
        "principal@domain.com",
        "hod@domain.com",
        "manager@domain.com"
    ],
    content: {
        sender: null,
        subject: "All students with {{course_name}} have completed the course",
        body: "Dear {{recipient_name}}...",
        data: [
            {
                course_name: "Arts",
                recipient_name: "John Doe"
            },
            {
                course_name: "Arts",
                recipient_name: "Jane Smith"
            }
        ]
    }
}

For Email + Batch:
- destination contains explicit email addresses.
- content.data contains optional per-destination template data.
- destination[i] corresponds to data[i].
- data is NOT the certificate recipient dataset.
- data is an additional dataset specifically for rendering the batch email.
- The user must be given a small file upload UI to provide this data.
- The uploaded file may be CSV, Excel, or JSON.
- Use the EXISTING `parsedUploadedData` function to parse the file.
- `parsedUploadedData` already converts CSV/Excel into JSON-compatible data and keeps JSON as JSON. This is important because the validation layer expects JSON input.
- Do NOT implement another CSV/Excel/JSON parser.
- Store the parsed result as the batch email `content.data`.
- Do not mutate the original uploaded certificate/recipient data.
- If the email content has no template variables, there is no need to require/show the additional batch-data upload.
- The additional upload is specifically for Email + Batch.

### Batch template data behavior

The additional data is optional from a delivery perspective.

For example:

destination:
[
    "a@gmail.com",
    "b@gmail.com",
    "c@gmail.com"
]

data:
[
    { t1: "aman" },
    { t1: "shradha" }
]

This does NOT mean the third email should be removed.

The effective behavior is:

destination[0] -> data[0]
destination[1] -> data[1]
destination[2] -> no data / empty template context

The certificate attachment is the primary artifact. Missing email template variables should only affect personalization, not whether the certificate is delivered.

Therefore:
- Do not force data.length === destination.length.
- Do not make missing batch template-data records a hard UI blocker.
- The backend/validation layer will report missing template variables as warnings.
- The UI should allow the user to continue with the configured delivery.

## Sender behavior

`sender` is now inside `content`.

For email:

- `sender: string` means use that sender.
- `sender: null` means use CertJS's default sender.

Update the email UI accordingly.

Do not expose sender as a generic delivery property for webhook.

## UI requirements

Update the existing Certificate & Delivery Settings UI.

For Email:
- Add a sender input/configuration.
- Allow it to be empty/null.
- Make it clear that leaving it empty means CertJS will use the default sender.
- Subject and body remain configurable.

For Email + Recipient:
- Destination remains a field selector from the original uploaded recipient data.
- No secondary file upload.
- Template variables are resolved from the original uploaded row.

For Email + Batch:
- Destination remains a list of explicit email addresses.
- Subject/body remain configurable.
- Detect whether subject/body contain template variables using the existing/template-variable parsing logic where appropriate.
- If template variables exist, show a compact secondary file upload control for "Batch email data" / equivalent user-friendly wording.
- Accept CSV, Excel, and JSON.
- Pass the selected file through the existing `parsedUploadedData` function.
- Store the parsed JSON result in `content.data`.
- Do not use the original certificate upload parser for this purpose if `parsedUploadedData` already handles the conversion.
- Show basic parsed-record information so the user knows the secondary data was loaded.
- Do not make the secondary data upload look like the primary certificate upload. It is supplemental data for email personalization.

## Schema construction

When constructing JobSemantics:

Email + Recipient:

{
    channel: "email",
    scope: "recipient",
    destination: [...],
    content: {
        sender: string | null,
        subject: string,
        body: string
    }
}

Email + Batch:

{
    channel: "email",
    scope: "batch",
    destination: [...],
    content: {
        sender: string | null,
        subject: string,
        body: string,
        data: parsedBatchEmailData
    }
}

Do not add `data` to recipient-scoped email semantics.

For webhook, preserve the existing webhook semantics and do not introduce email-specific fields such as sender or subject unless the current type explicitly requires them.

## Important validation distinction

Do not treat email template variables as certificate fields.

For Email + Recipient:
- Template variables come from the original recipient data.
- Missing template variables are warnings and resolve to "".

For Email + Batch:
- Template variables are validated against the secondary `content.data`.
- Missing template variables are warnings.
- Unexpected variables are warnings and are ignored.
- Missing batch template data must not cause the certificate recipient dataset to be removed.

Do not add batch email template variables to the main uploaded dataset's required-field validation.

## Delivery combinations

Continue enforcing the current valid combinations:

- Email + recipient
- Email + batch
- Webhook + recipient
- Webhook + batch

Only one configuration for each channel + scope combination is allowed.

Do not reintroduce:
- dashboard as a delivery channel
- artifact selection
- dashboard delivery configuration

Dashboard persistence remains a separate `dashboardPersistence` property.

## Scope discipline

Do not modify backend code.
Do not redesign the validation engine unless required to correctly wire the new UI data into the existing validation flow.
Do not change the certificate generation flow.
Do not introduce a new file parsing library.
Use the existing `parsedUploadedData` function.

After implementation:
1. Run TypeScript typecheck.
2. Run ESLint.
3. Fix any type errors caused by the schema/UI changes.
4. Summarize the files changed and the resulting UI/data flow.