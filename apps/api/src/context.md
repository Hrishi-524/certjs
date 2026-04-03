# CertJS — Context Checkpoint

## What CertJS Is
A developer tool in two flavors:
1. **API SaaS** — developers upload a certificate template, define placeholders (name, rank etc.), get an API key, call endpoints to batch-generate certificates
2. **Offline npm package** — same config tool on website, outputs `certjs.config.json`, developer uses npm package locally with no data leaving their machine

**Building Product 1 (API SaaS) first.**

---

## Tech Stack
- **Runtime:** Node.js + Express + TypeScript
- **DB:** PostgreSQL via Neon + Drizzle ORM
- **Storage:** AWS S3
- **Image rendering:** `sharp` (SVG composite approach — no canvas, avoids Windows native build issues)
- **Dev toolchain:** `tsx` + `nodemon` (NOT ts-node, it breaks with CommonJS)
- **Queue:** BullMQ + Redis (planned, not built yet)

---

## Project Structure
```
certjs/
├── apps/
│   └── api/
│       ├── src/
│       │   ├── index.ts
│       │   ├── controllers/
│       │   │   ├── templates.controller.ts   ✅ done
│       │   │   ├── users.controller.ts       ✅ temp endpoint
│       │   │   ├── placeholder.controller.ts ⬜ stubs only
│       │   │   ├── jobs.controller.ts        ⬜ empty
│       │   │   ├── document.controller.ts    ⬜ empty
│       │   │   └── types.ts
│       │   ├── routes/
│       │   │   ├── index.router.ts           ✅
│       │   │   ├── template.routes.ts        ✅
│       │   │   ├── placeholder.routes.ts     ✅ routes exist
│       │   │   ├── jobs.routes.ts            ⬜
│       │   │   └── document.routes.ts        ⬜
│       │   ├── services/
│       │   │   ├── templates.service.ts      ✅
│       │   │   ├── storage.service.ts        ✅ S3 working
│       │   │   └── render.service.ts         ⬜
│       │   ├── middleware/
│       │   │   └── upload.middleware.ts      ✅ multer
│       │   └── utils/
│       │       └── wrapAsync.ts              ✅
│       ├── tsconfig.json
│       └── package.json
├── packages/
│   ├── core/
│   │   └── renderer.ts                      ✅ WORKING
│   ├── db/
│   │   └── schema/
│   │       ├── users.ts                     ✅
│   │       ├── api_keys.ts                  ✅
│   │       ├── templates.ts                 ✅
│   │       ├── placeholders.ts              ✅
│   │       ├── jobs.ts                      ✅
│   │       └── documents.ts                 ✅
│   └── queue/                               ⬜ empty
└── tsconfig.base.json
```

---

## Database Schema (all migrated and live on Neon)
```
users          → id, username, email, password_hash, created_at
api_keys       → id, user_id, key_hash, name, created_at, lastused_at
templates      → id, user_id, name, s3_url, width, height, created_at
placeholders   → id, template_id, name, x, y, width, height, font_size, font_color, font_family
jobs           → id, user_id, template_id, status, total_count, processed_count, zip_s3_url, webhook_url, created_at, completed_at
documents      → id, job_id, recipient_data (JSON), verify_token, s3_url, created_at
```
**Note:** `align` column is missing from placeholders — needs to be added.

---

## The Render Engine (core of the product)
Lives in `packages/core/renderer.ts`. Uses `sharp` + SVG compositing:
1. Load template PNG as buffer
2. Build SVG string with `<text>` elements at placeholder coordinates
3. Composite SVG on top of template image
4. Return PNG buffer

```ts
export interface Placeholder {
  key: string;       // matches data key e.g. "name"
  x: number;
  y: number;
  fontSize?: number;
  fontColor?: string;
  align?: "left" | "center" | "right";
}

export interface RenderInput {
  templateBuffer: Buffer;
  placeholders: Placeholder[];
  data: Record<string, string>;
}

export async function renderCertificate(input: RenderInput): Promise<Buffer>
```
**Status: tested and working** — outputs correct PNG with text stamped on template.

---

## What's Working End-to-End
- `POST /api/v1/users/temp` — create test user ✅
- `POST /api/v1/templates` — upload PNG to S3, save metadata to Neon ✅
- `GET /api/v1/templates` — list all templates ✅
- `GET /api/v1/templates/:id` — get by ID ✅
- `DELETE /api/v1/templates/:id` ✅
- Render engine (tested via script) ✅

---

## What's NOT Built Yet (in order to build)
1. `POST /templates/:id/placeholders` — save placeholder positions to DB
2. `GET /templates/:id/placeholders` — fetch them back
3. `POST /jobs` — accept `{ template_id, recipients: [{name, rank}...] }`, enqueue batch
4. `GET /jobs/:id` — poll status
5. `GET /jobs/:id/download` — return zip of certificates
6. API key auth middleware — protect all endpoints except temp user creation
7. BullMQ worker in `apps/worker/`

---

## Key Decisions Made
- **Render target:** PNG via sharp (not PDF, not canvas)
- **Architecture:** Monorepo structure kept, but no turborepo/workspace magic — just folders
- **Module system:** CommonJS (not ESM/nodenext — caused ts-node issues)
- **Dev runner:** `tsx` + nodemon, NOT ts-node
- **Path aliases:** Dropped `@/` — use relative imports everywhere to avoid runtime resolution issues
- **Auth:** Not built yet — using hardcoded `user_id` UUID from Neon for testing
- **npm package (Product 2):** Build after API SaaS ships

---

## Environment
- Windows 11, Node 20, WSL available
- Neon DB live with test user: `7c2324a4-d19c-4fc3-8d88-975074b66948`
- S3 bucket: `hrishi-s3-bucket-796466897662`, region `ap-south-1`
- Server runs on port 3000
- Test file: `apps/api/test/templates.api.http`

---

## Immediate Next Step
Build `placeholder.controller.ts` — `addPlaceholdersToTemplate` and `getPlaceholdersForTemplate`. Routes already exist, controller stubs exist, schema is migrated. Just needs implementation.