# CertJS Codebase Structure

## Folder/Module Breakdown

### Root

Files:

- `package.json`
- `package-lock.json`
- `tsconfig.base.json`

Responsibilities:

- Defines npm workspaces for `apps/*` and `packages/*`.
- Provides top-level scripts for API and worker development.
- Holds shared base TypeScript compiler settings.

Observations:

- The monorepo shape is appropriate.
- Top-level build currently only builds `@certjs/db`, not all packages.
- Workspace package naming is inconsistent: root script uses workspace `api`, but `apps/api/package.json` name is `certjs-api`.

### `apps/api`

Responsibilities:

- HTTP API.
- Request parsing and routing.
- Template upload flow.
- Placeholder CRUD surface.
- Batch job creation surface.
- Drizzle migration config and generated migrations.

Key folders:

- `src/controllers`: request/response layer.
- `src/routes`: Express routers.
- `src/services`: business/data/storage/queue operations.
- `src/middleware`: upload middleware.
- `src/validations`: Zod request schemas.
- `src/test`: manual `.http` files and scripts.
- `drizzle`: SQL migrations and snapshots.

Implemented modules:

- `templates.controller.ts`
- `templates.service.ts`
- `storage.service.ts`
- `placeholders.service.ts`
- `jobs.service.ts`
- `users.controller.ts`
- `wrapAsync.ts`

Stub or empty modules:

- `document.controller.ts`
- `verify.controller.ts`
- Several functions in `jobs.controller.ts`
- Update/delete functions in `placeholder.controller.ts`

### `apps/worker`

Responsibilities:

- Process BullMQ document-generation jobs.
- Fetch DB rows and template image.
- Invoke core renderer.
- Update document/job state.
- Eventually upload rendered files and generate zips.

Key files:

- `index.ts`: worker runtime.
- `fetch-template-buffer.ts`: S3 read helper.
- `upload-rendered-document.ts`: S3 write helper for generated PNGs.
- `create-zip.ts`: empty placeholder.

Observations:

- Worker has the right conceptual role.
- It currently has correctness issues around DB queries, status increments, upload persistence, and config.

### `packages/core`

Responsibilities:

- Rendering engine independent of API/worker.
- Text layout strategies.
- Text width measurement.
- Debug overlay generation.

Key files:

- `render-engine.ts`
- `types.ts`
- `strategies/shrink-to-fit.ts`
- `strategies/ellipsis.ts`
- `strategies/warp-text.ts`
- `utils/measureWidth.ts`
- `utils/escapeXml.ts`
- `debug/overlay.ts`

Observations:

- This is the most cohesive package in the repo.
- It has a clear domain boundary: convert template buffer plus placeholder/data into rendered PNG.
- It needs tests and a better package export story.

### `packages/db`

Responsibilities:

- Database client creation.
- Drizzle schema definitions.
- Schema exports.

Key files:

- `index.ts`
- `schema/users.ts`
- `schema/api_keys.ts`
- `schema/templates.ts`
- `schema/placeholders.ts`
- `schema/jobs.ts`
- `schema/documents.ts`
- `schema/enum.ts`

Observations:

- Centralizing schema is good.
- Current schema/migration evolution has drift and inconsistencies.
- `index.ts` throws at import time if `DATABASE_URL` is missing, which can make tooling/tests brittle.

### `packages/queue`

Responsibilities:

- Shared BullMQ queue instance.

Key file:

- `index.ts`

Observations:

- The queue package is useful but currently too hardcoded.
- It should eventually expose connection configuration, queue names, job names, and job payload types.

## Responsibility Mapping

Current responsibility boundaries:

- API owns HTTP and user-triggered state changes.
- Services own DB/S3/queue calls.
- DB package owns schema and connection.
- Queue package owns BullMQ queue creation.
- Worker owns asynchronous execution.
- Core owns rendering.

This is the right broad split. The main issue is that contracts between packages are not yet strict enough:

- Queue payload shape is implicit.
- Worker expects fields that are not strongly shared with API.
- Core placeholder type differs from DB types and requires manual conversion.
- Storage URL conventions are duplicated between API and worker helpers.

## Dependency Relationships

Observed dependencies:

- `apps/api` depends on `@certjs/db`, `@certjs/queue`, AWS SDK, Express, Zod, Multer, Bcrypt.
- `apps/worker` depends on `@certjs/db`, `@certjs/core`, AWS SDK, BullMQ, Redis.
- `packages/core` depends on `sharp` and `@napi-rs/canvas`.
- `packages/db` depends on Drizzle and Neon.
- `packages/queue` depends on BullMQ and ioredis, mostly from root dependencies.

Architectural direction:

- API should not depend on worker.
- Worker should depend on core, db, queue contracts, and storage.
- Core should remain free of API/DB/storage dependencies.
- DB should remain free of API/worker/core dependencies.

Current direction mostly follows this, which is positive.

## Coupling/Cohesion Observations

High cohesion:

- `packages/core` rendering logic.
- `packages/db/schema` table definitions.
- Template service/controller path.

Medium cohesion:

- Job service has a coherent goal, but mixes validation, idempotency, DB writes, and queue enqueue.
- Worker is logically coherent, but currently contains too much orchestration and state mutation in one function.

High coupling:

- S3 URL format is parsed by string splitting in the worker.
- Queue name and Redis host are hardcoded in both queue and worker.
- API and worker both rely on implicit document job payload shape.
- Template upload uses hardcoded user ID, coupling app behavior to one database row.
- Placeholder DB numeric strings are manually converted in worker.

## Areas With Unclear Abstractions

- Public vs internal API: `/api/v1` exists but useful product APIs mostly live under `/api/in`.
- Document vs certificate naming: routes use both `/document` and `/certificates`.
- Job vs document job: schema has batch jobs and documents, while BullMQ jobs process documents. This should be explicitly named in types/docs.
- Storage ownership: template upload exists in API, generated upload helper exists in worker, but there is no shared storage abstraction.
- Verification: `verify_token` exists, but no service/controller contract defines how verification should work.
- API keys: schema exists without service, middleware, or lifecycle model.
- Zip generation: table field and empty file exist, but no job model for aggregation.

## Dead or Unused Code Detection

Likely unused or stale:

- `apps/api/src/controllers/verify.controller.ts` is empty.
- `apps/api/src/controllers/document.controller.ts` has an empty `generateCertificate`.
- `apps/api/src/controllers/jobs.controller.ts` contains empty status/download/retry/document-list functions.
- `apps/api/src/controllers/placeholder.controller.ts` contains empty update/delete functions.
- `apps/worker/create-zip.ts` is empty.
- `apps/worker/upload-rendered-document.ts` is implemented but not used in `apps/worker/index.ts`.
- `packages/db/schema/enum.ts` defines `statusEnum`, but current `jobs.status` uses text enum values instead.
- `apps/api/src/services/types.ts` defines `NotFoundError` but does not export or use it.
- `apps/api/src/test/test-render.ts` imports a removed/stale render engine path and uses an old placeholder interface.
- `apps/api/src/routes/internal/placeholder.routes.ts` is not mounted in `internal/index.router.ts`.
- `packages/core/strategies/shrink-to-fit.ts` imports `line` from Drizzle but does not use it.

Potentially stale documentation:

- `apps/api/src/context.md` says BullMQ was planned and not built, but queue/worker files now exist.
- It also states path aliases were dropped, but current API files heavily use `@/` aliases.
- It lists some API routes under `/api/v1/templates`, while current template routes are mounted under `/api/in/templates`.

## Architectural Inconsistencies

- Module system mismatch: API package is `"type": "module"` but TypeScript config uses `"module": "commonjs"`.
- Worker tsconfig path aliases point to `../../packages/db/src` and similar `src` folders that do not exist.
- Core package `package.json` exports `dist/index.js`, but source has no `index.ts` visible in `packages/core`.
- `packages/core/tsconfig.json` contains package metadata fields such as `name`, `main`, and `types`, which are not TypeScript compiler options.
- `packages/queue/tsconfig.json` uses `rootDir: "src"` and `include: ["src"]`, but package source file is `index.ts` at package root.
- `jobs.service.ts` imports from `@certjs/db/schema`, but API tsconfig only maps `@certjs/db`, not necessarily subpath imports.
- Migrations and current schema disagree on status enum history and document `s3_url` nullability.
- Test route enqueues `{ documentId }`, while worker expects `{ document_id }`.

## Overall Structure Assessment

The codebase has a promising architecture, especially for a student/internship project:

- It has a real monorepo.
- It separates API, worker, renderer, DB, and queue.
- It models batch processing properly at a high level.
- It uses real production-adjacent services: PostgreSQL, S3, Redis/BullMQ.

The main structural risk is contract drift. Several files show the system evolving quickly, but shared types, package exports, route contracts, schema constraints, and worker payloads have not yet been tightened. The next step should be to make the existing architecture executable and observable rather than adding many new feature areas.

