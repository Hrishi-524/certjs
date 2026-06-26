# Frontend API Guide

This guide summarizes the API routes used by the Next.js frontend. It is based on the Express routes, controllers, Zod schemas, and database schemas in `apps/api/src` and `packages/db/schema`.

## Base URL

The API server mounts all application routes under `/api`.

```ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";
```

Route groups:

| Group | Base path | Auth |
| --- | --- | --- |
| Dashboard | `/api/dashboard` | `Authorization: Bearer <accessToken>` |
| Developer API | `/api/v1` | `X-Api-Key: <apiKey>` |
| Public | `/api/public` | No auth |
| Health | `/health` | No auth |

The backend CORS config currently allows `http://localhost:3000` with `credentials: true`.

## Common Client Notes

- JSON endpoints expect `Content-Type: application/json`.
- Authenticated dashboard endpoints require `Authorization: Bearer <accessToken>`.
- Refresh/logout endpoints read the `refresh_token` HTTP-only cookie, so frontend `fetch` calls should use `credentials: "include"`.
- Successful date fields are serialized as strings over HTTP, even when shown as `Date` in server code.
- Error responses from `AppError` look like:

```json
{
  "success": false,
  "message": "Error message"
}
```

- Validation failures through `validateRequest` return:

```json
{
  "success": false,
  "message": "Invalid request data"
}
```

## Suggested Next.js API Layout

A simple `lib/api` split could look like:

```txt
lib/api/
  client.ts
  auth.ts
  templates.ts
  placeholders.ts
  jobs.ts
  documents.ts
  api-keys.ts
  public.ts
```

Example shared client:

```ts
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown
  ) {
    super(message);
  }
}

type ApiFetchOptions = RequestInit & {
  accessToken?: string;
  apiKey?: string;
};

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { accessToken, apiKey, headers, ...init } = options;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api"}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      ...(init.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(apiKey ? { "X-Api-Key": apiKey } : {}),
      ...headers
    }
  });

  if (res.status === 204) return undefined as T;

  const body = await res.json().catch(() => undefined) as { message?: string } | undefined;

  if (!res.ok) {
    throw new ApiError(res.status, body?.message ?? "Request failed", body);
  }

  return body as T;
}
```

## Auth Endpoints

Base path: `/api/dashboard/auth`

### Sign Up

`POST /signup`

Request:

```ts
{
  name: string;      // min 2, max 100
  username: string;  // min 3, max 30
  email: string;
  password: string;  // min 8
}
```

Response `201`:

```ts
{
  user: {
    id: string;
    email: string;
    username: string;
  }
}
```

### Login

`POST /login`

Request:

```ts
{
  email: string;
  password: string;
}
```

Response `200` also sets an HTTP-only `refresh_token` cookie:

```ts
{
  accessToken: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
  session: {
    id: string;
    expires_at: string;
  }
}
```

### Current User

`GET /me`

Auth: bearer token.

Response `200`:

```ts
{
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar_url: string | null;
    email_verified: boolean;
  }
}
```

### Refresh Access Token

`POST /refresh`

Uses the refresh cookie. Send with `credentials: "include"`.

Response `200`:

```ts
{
  access_token: string;
}
```

Note the response field is `access_token`, while login returns `accessToken`.

### Logout

`POST /logout`

Uses the refresh cookie and clears it.

Response `200`:

```ts
{ success: true }
```

### Logout All Sessions

`POST /logout-all`

Uses the refresh cookie and clears it.

Response `200`:

```ts
{ success: true }
```

### Google OAuth

- `GET /google` redirects to Google OAuth.
- `GET /google/callback?code=...` completes Google login and returns credentials from the OAuth service.

Implementation note: the callback sets a cookie named `refreshToken`, while password login/refresh/logout use `refresh_token`.

## Templates

Base path: `/api/dashboard/templates`

All endpoints require bearer auth.

Template response shape:

```ts
type Template = {
  id?: string;
  template_id?: string;
  user_id: string;
  name: string;
  s3_url: string;
  s3_key?: string;
  version?: number;
  is_active?: boolean;
  width: number | null;
  height: number | null;
  created_at: string;
};
```

Some list endpoints return database field names (`id`), while create/get/update controllers return `template_id`.

### Upload Template

`POST /`

Content type: `multipart/form-data`

Fields:

```ts
{
  template: File; // field name must be "template"; PNG, JPEG, or WebP; max 5 MB
  name: string;   // 1-100 chars
  width: number;  // integer, positive, max 10000
  height: number; // integer, positive, max 10000
}
```

Response `201`:

```ts
{
  template_id: string;
  user_id: string;
  s3_key: string;
  s3_url: string;
  name: string;
  width: number;
  height: number;
  created_at: string;
}
```

Example:

```ts
const formData = new FormData();
formData.append("template", file);
formData.append("name", name);
formData.append("width", String(width));
formData.append("height", String(height));

await apiFetch("/dashboard/templates", {
  method: "POST",
  accessToken,
  body: formData
});
```

### List Templates

`GET /`

Response `200`:

```ts
Array<{
  id: string;
  user_id: string;
  name: string;
  s3_url: string;
  version: number;
  is_active: boolean;
  width: number | null;
  height: number | null;
  created_at: string;
}>
```

### Get Template

`GET /:id`

Response `200`:

```ts
{
  template_id: string;
  user_id: string;
  s3_url: string;
  name: string;
  width: number | null;
  height: number | null;
  created_at: string;
}
```

### Update Template Name

`PATCH /:id`

Request:

```ts
{
  name: string; // 1-100 chars
}
```

Response `200`:

```ts
{
  template_id: string;
  user_id: string;
  s3_url: string;
  name: string;
  width: number | null;
  height: number | null;
  created_at: string;
}
```

### Delete Template

`DELETE /:id`

Response `204` with no body.

## Placeholders

Base path: `/api/dashboard/templates/:id/placeholders`

All endpoints require bearer auth.

Placeholder model:

```ts
type Placeholder = {
  id: string;
  template_id: string;
  name: string;
  key: string;
  x: number;
  y: number;
  width: number;
  height: number;
  strategy: "shrink" | "ellipsis" | "wrap";
  min_font_size: number | null;
  align: "left" | "center" | "right";
  font_size: number;
  font_color: string;
  font_family: string;
};
```

Create placeholder input:

```ts
type PlaceholderInput = {
  name: string;
  key: string;
  x: number;
  y: number;
  width: number;
  height: number;
  font_size: number;
  font_color: string;
  font_family: string;
  strategy?: "shrink" | "ellipsis" | "wrap";
  min_font_size?: number;
  align?: "left" | "center" | "right";
};
```

### Add Placeholders

`POST /`

Request:

```ts
PlaceholderInput[]
```

Response `201`:

```ts
Placeholder[]
```

### List Placeholders

`GET /`

Response `200`:

```ts
Placeholder[]
```

### Update Placeholder

`PUT /:placeholderId`

Request:

```ts
Partial<PlaceholderInput>
```

Response `200`:

```ts
Placeholder
```

### Delete Placeholder

`DELETE /:placeholderId`

Response `204` with no body.

## Jobs

Dashboard base path: `/api/dashboard/jobs`

Developer base path: `/api/v1/jobs`

Dashboard endpoints require bearer auth. Developer endpoints require `X-Api-Key`.

Statuses:

```ts
type JobStatus = "pending" | "processing" | "completed" | "failed";
type RecipientData = Record<string, string | number>;
```

### Create Batch Job

Dashboard: `POST /api/dashboard/jobs`

Developer: `POST /api/v1/jobs`

Request:

```ts
{
  templateId: string;
  recipients: RecipientData[]; // min 1
  idempotencyKey: string;
  webhookUrl?: string;
}
```

Each recipient must contain every placeholder `key` defined on the template.

Response `201`:

```ts
{
  job_id: string;
  status: JobStatus;
  total_count: number;
  processed_count: number;
}
```

Possible validation/business errors:

- `404` if the template is not found.
- `403` if the template is owned by another user.
- `400` if the template is inactive.
- `400` if the template has no placeholders.
- `400` if any recipient is missing a required placeholder key.

### Get Job Status

Dashboard: `GET /api/dashboard/jobs/:jobId`

Developer: `GET /api/v1/jobs/:jobId`

Response `200`:

```ts
{
  status: JobStatus;
  meta: {
    total_count: number;
    processed_count: number;
    failed_count: number;
    last_error: string | null;
  }
}
```

### List Job Documents

Dashboard: `GET /api/dashboard/jobs/:jobId/documents`

Developer: `GET /api/v1/jobs/:jobId/documents`

Response `200`:

```ts
{
  count: number;
  documents: Document[];
}
```

### Download Job ZIP

Dashboard: `GET /api/dashboard/jobs/:jobId/download`

Developer: `GET /api/v1/jobs/:jobId/download`

Response `200`:

```ts
string
```

The response body is the ZIP URL as a JSON string, not `{ url: string }`.

If the job is not complete yet:

```ts
{
  message: "Job not completed yet";
}
```

with status `409`.

### Retry Failed Documents

Dashboard: `POST /api/dashboard/jobs/:jobId/retry`

Developer: `POST /api/v1/jobs/:jobId/retry`

Response `200`:

```ts
{
  message: "Job queued for retry";
  retryCount: {
    retried_count: number;
  }
}
```

If there are no failed documents, the API returns `400`.

## Documents

Dashboard base paths:

- `/api/dashboard/document`
- `/api/dashboard/certificates`

Both dashboard paths are wired to the same document router.

Developer base path:

- `/api/v1/documents`

Dashboard endpoints require bearer auth. Developer `GET /api/v1/documents/:documentId` requires `X-Api-Key`.

Document model:

```ts
type Document = {
  id: string;
  job_id: string;
  recipient_data: Record<string, string | number>;
  status: "pending" | "processing" | "completed" | "failed";
  error: string | null;
  verify_token: string;
  s3_url: string | null;
  created_at: string;
};
```

### Get Document

Dashboard:

- `GET /api/dashboard/document/:documentId`
- `GET /api/dashboard/certificates/:documentId`

Developer:

- `GET /api/v1/documents/:documentId`

Response `200`:

```ts
Document & {
  job_status: "pending" | "processing" | "completed" | "failed";
  template_id: string;
}
```

### Download Document

Dashboard:

- `GET /api/dashboard/document/:documentId/download`
- `GET /api/dashboard/certificates/:documentId/download`

Response `200`:

```ts
{
  url: string;
}
```

Only completed documents with a stored S3 URL can be downloaded. Otherwise the API returns `404`.

There is currently no developer `/api/v1/documents/:documentId/download` route.

## Dashboard API Keys

Base path: `/api/dashboard/api-keys`

All endpoints require bearer auth.

### Create API Key

`POST /`

Request:

```ts
{
  name: string;          // min 3, max 60
  expiry?: string | null; // coerced to Date; must be in the future when present
}
```

Response `201`:

```ts
{
  apikey: string;  // full API key; show/copy once
  prefix: string;
  apiKeyId: string;
}
```

### List API Keys

`GET /`

Response `200`:

```ts
Array<{
  id: string;
  name: string;
  prefix: string;
  isActive: boolean;
  createdAt: string;
  lastUsedAt: string | null;
  expiresAt: string | null;
}>
```

### Get API Key Prefix

`GET /:apiKeyId`

Response `200`:

```ts
{
  prefix: string;
}
```

### Delete API Key

`DELETE /:apiKeyId`

Response `204` with no body.

### Deactivate API Key

`POST /:apiKeyId/deactivate`

Response `200`:

```ts
{
  name: string;
  prefix: string;
}
```

## Developer API

Base path: `/api/v1`

Auth: `X-Api-Key: <apiKey>`

Developer endpoints mirror job/document read APIs for external integrations:

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/jobs` | Create a certificate batch job |
| `GET` | `/jobs/:jobId` | Poll job status |
| `GET` | `/jobs/:jobId/documents` | List documents in a job |
| `GET` | `/jobs/:jobId/download` | Get completed job ZIP URL |
| `POST` | `/jobs/:jobId/retry` | Retry failed documents |
| `GET` | `/documents/:documentId` | Get one document |

Use the same request and response shapes documented in the Jobs and Documents sections.

## Public Verification

Base path: `/api/public`

### Verify Certificate

`GET /certificates/:verifyToken`

`verifyToken` must be a hex string.

Valid completed certificate response `200`:

```ts
{
  verified: true;
  template_name: string;
  recipient: Record<string, string | number>;
  issued_at: string;
  status: "completed";
}
```

Invalid, missing, or not-yet-completed certificate response:

```ts
{
  verified: false;
  message: "Certificate not found or invalid or is not generated yet";
}
```

The controller also has a fallback `404` response shape:

```ts
{
  verified: false;
  message: "Certificate not found or invalid";
}
```

## Health Check

`GET /health`

Response body:

```txt
Health check successful!
```

## Frontend Normalization Tips

- Normalize `accessToken` and `access_token` to one frontend auth state field.
- Normalize template IDs because list responses use `id`, while create/get/update responses use `template_id`.
- Normalize job ZIP downloads because `/jobs/:jobId/download` returns a JSON string, while document downloads return `{ url }`.
- Treat `204` responses as `undefined`.
- Keep the full API key from `POST /dashboard/api-keys` out of long-term client state; the server only returns it once.
- For server components or route handlers, pass API calls through your own backend carefully if they require bearer tokens or cookies. Browser-side dashboard calls need the access token, while refresh/logout need `credentials: "include"`.
