# Routes

This directory defines all **API route definitions** for the CertJS backend.

Routes map HTTP endpoints to their corresponding controller functions.

Each route file groups endpoints by **resource domain** to maintain a clean and scalable API structure.

---

## Route Structure

Example structure:

```
routes/
├── template.routes.ts
├── placeholder.routes.ts
├── job.routes.ts
├── document.routes.ts
└── verify.routes.ts
```

Each file:

* Creates an Express `Router`
* Defines route paths
* Connects routes to controller functions

Routes should **not contain business logic**.
Their only responsibility is mapping requests to controllers.

---

## API Overview

The core REST API exposed by CertJS is structured around the following resources.

### Templates

```
POST   /templates
GET    /templates
GET    /templates/:id
DELETE /templates/:id
```

Manages certificate template metadata.

---

### Placeholders

```
POST /templates/:id/placeholders
GET  /templates/:id/placeholders
PUT  /placeholders/:id
DELETE /placeholders/:id
```

Defines where dynamic values (name, date, etc.) appear on a template.

---

### Jobs

```
POST /jobs/single
POST /jobs/batch
GET  /jobs/:jobId
GET  /jobs/:jobId/download
```

Handles asynchronous certificate generation.

Jobs are queued and processed by background workers.

---

### Documents

```
GET /documents/:id
```

Provides metadata and access for generated certificates.

---

### Verification

```
GET /verify/:token
```

Public endpoint used to verify certificate authenticity.

This endpoint does not require authentication.

---

## API Versioning

Future versions of the API may be grouped under a version prefix:

```
/api/v1/templates
/api/v1/jobs
/api/v1/documents
```

This allows backward-compatible evolution of the API.

---

## Request Flow

Typical request lifecycle:

```
Client Request
      ↓
Route
      ↓
Controller
      ↓
Service Layer
      ↓
Database / Worker / Storage
```

This layered architecture keeps routing simple and ensures business logic is reusable.
