# Controllers

This directory contains **Express controller functions** responsible for handling incoming HTTP requests and sending responses.

Controllers act as the **interface between routes and business logic**.
They should remain **thin** and avoid implementing heavy logic directly.

Their primary responsibilities are:

* Validate and extract request data (`req.params`, `req.body`, `req.query`)
* Call appropriate **service layer functions**
* Format and return the HTTP response
* Forward errors to the global error handler

Controllers should **not**:

* Contain complex business logic
* Directly perform long-running tasks
* Implement rendering or background processing
* Handle database queries beyond simple orchestration

Those responsibilities belong in the **services** or **workers** layer.

---

## Controller Structure

Each controller file corresponds to a **domain resource**.

Example structure:

```
controllers/
├── template.controller.ts
├── placeholder.controller.ts
├── job.controller.ts
├── document.controller.ts
└── verify.controller.ts
```

---

## Responsibilities by Controller

### `template.controller.ts`

Handles template management.

Function names exactly :
deleteTemplate, getTemplate, getTemplates, uploadTemplate

Typical actions:

* Create template metadata
* Fetch template list
* Retrieve template details
* Delete template

---

### `placeholder.controller.ts`

Handles placeholder metadata for templates.

Function names exactly :
addPlaceholdersToTemplate, getPlaceholdersForTemplate, updatePlaceholderForTemplate, deletePlaceholderForTemplate

Typical actions:

* Add placeholders to a template
* Retrieve placeholders for a template
* Update placeholder position or styling
* Delete placeholders

---

### `job.controller.ts`

Handles **certificate generation requests**.

Function names exactly :
createSingleJob, createBatchJob, getJobStatus, downloadJobZip

Typical actions:

* Create single generation job
* Create batch generation job
* Retrieve job status
* Provide download URL when job completes

This controller **does not generate certificates itself**.
It only **queues jobs and returns job status**.

---

### `document.controller.ts`

Handles document-level operations.

Function names exactly :
getDoc

Typical actions:

* Fetch generated document metadata
* Retrieve individual certificate URLs

---

### `verify.controller.ts`

Public endpoint for certificate verification.

Typical actions:

* Validate certificate authenticity using verification token
* Return certificate metadata for public display

---

## Design Principle

Controllers should follow this pattern:

```
Route → Controller → Service → Database / Worker
```

Controllers should remain small and readable so that the **core logic lives in services**.

---

## Error Handling

All async controllers should be wrapped using the `wrapAsync` utility.

Example:

```
router.post("/jobs/batch", wrapAsync(createBatchJob));
```

This ensures errors propagate correctly to the global error middleware.
