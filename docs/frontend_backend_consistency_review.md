# Frontend/Backend Consistency Review

Review date: 2026-07-03

Scope:

- Backend routes/controllers/schemas/services under `apps/api/src`
- Frontend API clients under `apps/web/lib/api`
- Frontend response/request types under `apps/web/types`

## Findings

### 1. Direct document responses still leak snake_case fields

Severity: High

Backend direct document lookup returns raw DB fields plus snake_case extras:

- `apps/api/src/controllers/document.controller.ts:17`
- `apps/api/src/controllers/document.controller.ts:18`
- `apps/api/src/controllers/document.controller.ts:19`
- `apps/api/src/controllers/document.controller.ts:20`

Frontend expects camelCase:

- `apps/web/types/documents.types.ts:3`
- `apps/web/types/documents.types.ts:4`
- `apps/web/types/documents.types.ts:7`
- `apps/web/types/documents.types.ts:8`
- `apps/web/types/documents.types.ts:9`
- `apps/web/types/documents.types.ts:13`
- `apps/web/types/documents.types.ts:14`

Actual backend shape is currently closer to:

```ts
{
  id: string;
  job_id: string;
  recipient_data: Record<string, string | number>;
  status: JobStatus;
  error: string | null;
  verify_token: string;
  s3_url: string | null;
  created_at: string;
  job_status: JobStatus;
  template_id: string;
}
```

Expected frontend shape:

```ts
{
  id: string;
  jobId: string;
  recipientData: Record<string, string | number>;
  status: JobStatus;
  error: string | null;
  verifyToken: string;
  s3Url: string | null;
  createdAt: string;
  jobStatus: JobStatus;
  templateId: string;
}
```

Suggestion: map `data.doc` explicitly in `getDocument`, similar to `getJobDocumentsService`.

### 2. Placeholder requests and responses are not camelCase-compatible

Severity: High

Frontend placeholder input sends camelCase fields:

- `apps/web/types/placeholders.types.ts:25`
- `apps/web/types/placeholders.types.ts:26`
- `apps/web/types/placeholders.types.ts:27`
- `apps/web/types/placeholders.types.ts:29`

Backend Zod schema still expects snake_case fields:

- `apps/api/src/schema/placeholders.schema.ts:18`
- `apps/api/src/schema/placeholders.schema.ts:19`
- `apps/api/src/schema/placeholders.schema.ts:20`
- `apps/api/src/schema/placeholders.schema.ts:23`

Backend placeholder service also returns raw DB rows:

- `apps/api/src/services/placeholders/placeholders.service.ts:17`
- `apps/api/src/services/placeholders/placeholders.service.ts:19`
- `apps/api/src/services/placeholders/placeholders.service.ts:23`
- `apps/api/src/services/placeholders/placeholders.service.ts:27`
- `apps/api/src/services/placeholders/placeholders.service.ts:43`
- `apps/api/src/services/placeholders/placeholders.service.ts:51`

That means create/update calls using frontend types will fail validation or write the wrong shape, and list/create/update responses will not match `Placeholder`.

Suggestion: make the HTTP contract camelCase and convert at the service boundary:

```ts
// request schema
fontSize: z.number().int().positive()
fontColor: z.string().trim().min(1)
fontFamily: z.string().trim().min(1)
minFontSize: z.number().int().positive().optional()

// DB insert/update mapping
font_size: item.fontSize
font_color: item.fontColor
font_family: item.fontFamily
min_font_size: item.minFontSize
```

Then map DB rows back to:

```ts
{
  templateId: row.template_id,
  fontSize: row.font_size,
  fontColor: row.font_color,
  fontFamily: row.font_family,
  minFontSize: row.min_font_size
}
```

### 3. Job ZIP download frontend path does not match the backend route

Severity: High

Backend route:

- `apps/api/src/routes/dashboard/jobs.routes.ts:9`

Frontend call:

- `apps/web/lib/api/jobs.ts:20`

Backend exposes:

```txt
GET /api/dashboard/jobs/:jobId/download
```

Frontend calls:

```txt
GET /api/dashboard/jobs/:jobId/documents/download
```

Suggestion: change the frontend wrapper to `/dashboard/jobs/${jobId}/download`.

Also, the backend returns JSON `{ zipUrl }`, not a `Blob`:

- `apps/api/src/controllers/jobs.controller.ts:71`
- `apps/web/lib/api/jobs.ts:19`

Suggested frontend type:

```ts
export type DownloadBatchJobDocumentsResponse = {
  zipUrl: string;
}
```

### 4. Public verification frontend path is missing `/public`

Severity: High

Backend mounts public routes under `/api/public`:

- `apps/api/src/routes/index.ts:10`

Frontend env currently uses:

```txt
NEXT_PUBLIC_API_BASE=http://localhost:3000/api
```

Frontend call:

- `apps/web/lib/api/public.ts:6`

Current frontend URL resolves to:

```txt
GET /api/certificates/:verifyToken
```

Backend route is:

```txt
GET /api/public/certificates/:verifyToken
```

Suggestion: change the frontend wrapper to:

```ts
clientApi.get<VerificationResponse>(`/public/certificates/${verifyToken}`)
```

### 5. Retry response still has a nested snake_case count

Severity: Medium

Frontend expects:

- `apps/web/types/jobs.types.ts:34`
- `apps/web/types/jobs.types.ts:37`

Backend currently returns:

```ts
{
  message: "Job queued for retry",
  retryCount: {
    retried_count: number
  }
}
```

Source:

- `apps/api/src/controllers/jobs.controller.ts:90`
- `apps/api/src/services/jobs/jobs.service.ts:211`

Suggestion: either return `retryCount: result.retried_count` or map to:

```ts
{
  message: "Job queued for retry",
  retryCount: {
    retriedCount: result.retried_count
  }
}
```

The second option matches the current frontend type.

### 6. Template upload wrapper sends JSON instead of multipart form data

Severity: Medium

Backend expects multipart `template` file upload:

- `apps/api/src/routes/dashboard/template.routes.ts:7`
- `apps/api/src/controllers/templates.controller.ts:10`

Frontend currently posts the typed object directly:

- `apps/web/lib/api/templates.ts:4`
- `apps/web/lib/api/templates.ts:5`

With Axios, that object will not automatically become the `multipart/form-data` payload multer expects.

Suggestion: construct `FormData` inside `uploadTemplate`:

```ts
const formData = new FormData();
formData.append("template", input.template);
formData.append("name", input.name);
formData.append("width", String(input.width));
formData.append("height", String(input.height));

const { data } = await clientApi.post<UploadTemplateResponse>(
  "/dashboard/templates",
  formData
);
```

### 7. Web build is currently blocked by an empty middleware file

Severity: Medium

`npm run build -w web` fails before it can fully validate app code:

```txt
./apps/web/middleware.ts
Middleware is missing expected function export name
```

`apps/web/middleware.ts` appears to be empty.

Suggestion: either remove `apps/web/middleware.ts` or export a valid `middleware`/default function. Next.js 16 also warns that `middleware` is deprecated in favor of `proxy`.

### 8. Standalone TypeScript check is blocked by empty page modules

Severity: Low

`npx tsc -p apps/web/tsconfig.json --noEmit` fails with `.next` validator errors because several app route files are not modules, for example:

```txt
apps/web/app/dashboard/api-keys/page.tsx is not a module
apps/web/app/dashboard/jobs/page.tsx is not a module
apps/web/app/dashboard/templates/page.tsx is not a module
```

Suggestion: add at least a default export to each page file, or exclude generated `.next` folders from the check once the app structure is complete.

## Things That Look Consistent Now

- Template route params now use `:templateId`, and backend schemas parse `templateId`.
- Template create/get/update/list responses now mostly use camelCase. `getAllTemplates` maps raw DB rows to camelCase.
- Auth login/refresh/current-user responses now use `accessToken`, `expiresAt`, `avatarUrl`, and `emailVerified`.
- Job create/status/list-documents responses now mostly use camelCase.
- Document download returns `{ presignedUrl }`, matching `DownloadDocumentResponse`.
- Public verification response now uses `templateName` and `issuedAt`, matching frontend types.
- API key response types are consistent with the current controller/service mapping.

## Verification Ran

```txt
npm run build -w @certjs/api
```

Result: passed.

```txt
npm run build -w web
```

Result: failed because `apps/web/middleware.ts` has no valid middleware/default export.

```txt
npx tsc -p apps/web/tsconfig.json --noEmit
```

Result: failed because generated Next validators see several page files as non-modules.

## Suggested Fix Order

1. Fix direct document response mapping.
2. Fix placeholder request schema and response mapping.
3. Fix job ZIP download path and response type.
4. Fix public verification path.
5. Fix retry response shape.
6. Change template upload wrapper to send `FormData`.
7. Remove or implement `apps/web/middleware.ts`.
8. Add default exports to empty Next page files so frontend type/build checks can catch deeper issues.

Mostly yes, you fixed the big consistency issues.

Still worth fixing/checking these 3 things:

1. `updatePlaceholder` still passes camelCase data directly into Drizzle `.set(data)` in `apps/api/src/services/placeholders/placeholders.service.ts`.
   Create maps camelCase to snake_case correctly, but update does not. So updating `fontSize`, `fontColor`, etc. may not update DB columns correctly. Add the same mapping before `.set(...)`.

2. `apps/web/types/jobs.types.ts` uses `documents: Document[]` but does not import your custom `Document` type from `documents.types.ts`.
   TypeScript may resolve that to the browser DOM `Document`. Add:
   ```ts
   import type { Document } from "./documents.types";
   ```

3. `apps/web/lib/api/interceptors.ts` is not imported anywhere from what I found.
   If nothing imports it as a side effect, your bearer token interceptor will never attach `Authorization`. Usually fix by importing it once near app bootstrap or from `client.ts`.

Good stuff: document response normalization looks fixed, placeholder create/list response mapping looks fixed, job ZIP path and `{ zipUrl }` type look fixed, retry now returns `retriedCount`, public verify now includes `/public`, and template upload now uses `FormData`. Also, the old empty middleware file appears gone.
