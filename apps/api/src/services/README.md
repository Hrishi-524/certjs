# Services

The **services layer** contains the core business logic of the CertJS backend.

Services are responsible for performing the actual work of the application.
They sit between **controllers** and **infrastructure layers** such as the database, rendering engine, or storage systems.

Controllers should remain thin and delegate most work to services.

---

## Responsibilities

Services typically perform the following tasks:

* Execute business logic
* Interact with the database
* Communicate with background workers
* Trigger rendering pipelines
* Handle storage interactions (e.g., S3 uploads)
* Aggregate and process data from multiple sources

Services should **not** handle HTTP-specific logic such as request parsing or response formatting.

---

## Service Structure

Example layout:

```
services/
├── template.service.ts
├── placeholder.service.ts
├── job.service.ts
├── render.service.ts
├── storage.service.ts
└── verify.service.ts
```

Each service corresponds to a **functional domain** of the system.

---

## Responsibilities by Service

### `template.service.ts`

Handles template-related operations.

Typical tasks:

* Store template metadata
* Retrieve template details
* Delete templates
* Validate template ownership

---

### `placeholder.service.ts`

Manages placeholder definitions within templates.

Typical tasks:

* Create placeholders
* Retrieve placeholders for a template
* Update placeholder coordinates and styling
* Remove placeholders

---

### `job.service.ts`

Manages certificate generation jobs.

Typical tasks:

* Create single or batch jobs
* Track job progress
* Update job status
* Provide download links when jobs complete

This service orchestrates the certificate generation workflow but **does not perform the rendering itself**.

---

### `render.service.ts`

Responsible for rendering certificates.

Typical tasks:

* Load template image
* Apply placeholder data
* Render text onto the certificate
* Produce final document files

Rendering typically uses an image processing library such as **Sharp**.

---

### `storage.service.ts`

Handles file storage and retrieval.

Typical tasks:

* Upload rendered certificates to object storage
* Store batch ZIP files
* Generate signed download URLs

Storage backends may include **S3-compatible services**.

---

### `verify.service.ts`

Handles certificate authenticity checks.

Typical tasks:

* Validate verification tokens
* Retrieve certificate metadata
* Return verification results

This service supports the public verification endpoint.

---

## Architectural Role

Services sit at the center of the application architecture:

```
Client Request
      ↓
Route
      ↓
Controller
      ↓
Service
      ↓
Database / Worker / Storage / Rendering
```

This separation ensures that business logic remains reusable and testable.

---

## Design Principle

Services should be:

* Stateless
* Modular
* Focused on one domain
* Reusable across controllers or workers

Complex workflows (such as batch certificate generation) should be coordinated within services rather than controllers.
