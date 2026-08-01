---
Title: Worker Architecture
Status: Stable
Owner: Hrishi Patil
Last Updated: 2026-08-02

Related Files:
- apps/worker/index.ts
- apps/worker/finalizer-worker.ts
- apps/worker/webhook-worker.ts
- apps/worker/utils/profiler.ts
- apps/worker/utils/template-cache.ts
- apps/worker/utils/finalizer-buffer-cache.ts

Related Documents:
- 01-system-overview.md
---

# 02. Worker Architecture

## 1. Overview

The Worker subsystem is responsible for all asynchronous certificate processing within CertJS.

Instead of generating certificates inside the API request lifecycle, the system delegates long-running tasks to BullMQ workers. This keeps API responses fast while allowing rendering, uploads, ZIP creation, retries, and future scaling to happen independently.

The subsystem is intentionally divided into multiple workers instead of a single monolithic processor. Each worker owns a specific stage of the certificate lifecycle and communicates through persistent database state.

The worker architecture evolved significantly during development. It started as a straightforward asynchronous pipeline and gradually became an optimized, observable, production-oriented system through profiling and incremental engineering improvements rather than major architectural rewrites.

---

# 2. Problem Statement

Generating certificates involves multiple expensive operations:

- downloading templates
- rendering images
- uploading generated certificates
- tracking progress
- packaging certificates into ZIP archives

Performing these tasks synchronously inside API requests would:

- increase response latency
- reduce throughput
- make failures harder to recover
- tightly couple frontend requests with expensive processing

The worker subsystem solves this by moving certificate generation into asynchronous background jobs.

---

# 3. Design Goals

The worker subsystem was designed around the following goals:

- Keep API requests lightweight.
- Process certificates asynchronously.
- Prevent duplicate processing.
- Maintain database consistency.
- Support retries.
- Scale independently of the API.
- Keep responsibilities separated.
- Build observability into the system.

---

# 4. High-Level Architecture

```text
                API
                 │
                 ▼
        Create Batch Job
                 │
                 ▼
       Create Document Records
                 │
                 ▼
     Enqueue Certificate Jobs
                 │
                 ▼
        ┌─────────────────────┐
        │ Certificate Worker  │
        └─────────────────────┘
                 │
                 ▼
     Generated Certificates
                 │
                 ▼
      Enqueue Finalizer Job
                 │
                 ▼
        ┌─────────────────────┐
        │  Finalizer Worker   │
        └─────────────────────┘
                 │
                 ▼
          ZIP Archive Ready
                 │
                 ▼
             Frontend
```

The API never performs rendering.

Workers own the entire document generation lifecycle.

---

# 5. Workflow

## Certificate Worker

Every document follows the same execution path.

```text
BullMQ Job

↓

Claim Document

↓

Fetch Template

↓

Render Certificate

↓

Store Buffer (Temporary Cache)

↓

Upload Certificate

↓

Update Database

↓

Increment Batch Progress

↓

If Batch Complete

↓

Enqueue Finalizer
```

---

## Finalizer Worker

The Finalizer starts only after every document has reached a terminal state.

```text
Receive Finalizer Job

↓

Fetch Completed Documents

↓

Obtain Certificate Buffers

↓

Create ZIP

↓

Upload ZIP

↓

Update Batch

↓

Cleanup Temporary Cache
```

---

# 6. Core Components

## Certificate Worker

Responsible for processing exactly one certificate.

Responsibilities:

- claim document
- fetch template
- render image
- upload PNG
- update document state
- enqueue finalizer when appropriate

---

## Finalizer Worker

Responsible for processing one completed batch.

Responsibilities:

- collect certificates
- build ZIP archive
- upload ZIP
- update batch status
- cleanup temporary memory

---

## Webhook Worker

Reserved for asynchronous external notifications.

Separating webhook processing from certificate generation prevents external integrations from slowing the rendering pipeline.

---

## Template Cache

Stores

```text
Map<TemplateId, Promise<Buffer>>
```

instead of

```text
Map<TemplateId, Buffer>
```

This allows concurrent workers requesting the same template to await a single in-flight download.

---

## Finalizer Buffer Cache

Stores

```text
Map<
    BatchJobId,
    Map<DocumentId, Buffer>
>
```

This cache exists only while a batch is being finalized.

Its purpose is to avoid immediately downloading certificates from S3 that were just rendered by the Certificate Worker.

The cache is cleared immediately after batch completion.

S3 always remains the permanent source of truth.

---

## Profiler

The worker includes an internal profiling system that measures execution time for every important stage.

Three logging levels are supported:

- minimal
- normal
- verbose

Profiling can be adjusted through environment configuration without modifying worker code.

---

# 7. Key Design Decisions

## Separate Workers

Certificate generation and ZIP creation were intentionally separated.

Benefits:

- simpler responsibilities
- easier debugging
- independent scaling
- smaller failure domains

---

## Database as Source of Truth

Workers communicate through persistent database state rather than direct memory.

The batch completes when

```text
processed_count + failed_count == total_count
```

ensuring consistent completion even when failures occur.

---

## Promise-Based Template Cache

Originally every concurrent worker downloaded the same template independently.

Current behaviour:

```text
Worker 1

↓

Download Template

↓

Store Promise

──────────────

Workers 2..N

↓

Await Same Promise
```

This eliminates redundant downloads while remaining concurrency-safe.

---

## Temporary Finalizer Cache

Without caching:

```text
Render

↓

Upload

↓

Download Again

↓

ZIP
```

With caching:

```text
Render

↓

Temporary Memory

↓

ZIP

↓

Upload ZIP
```

If the buffer is unavailable, the Finalizer automatically falls back to downloading from S3.

The cache is therefore an optimization rather than a dependency.

---

## Multi-Level Profiling

Rather than removing profiler code after optimization, profiling became a permanent part of the worker.

Levels:

Minimal

- overall timings

Normal

- stage timings

Verbose

- low-level diagnostics
- cache behaviour
- S3 operations

This allows production and development environments to use different logging depths.

---

# 8. Performance Considerations

Performance optimization was driven by measurements rather than assumptions.

A profiler was introduced before making architectural changes.

Key findings included:

- Rendering was relatively inexpensive.
- ZIP creation was already fast.
- Buffer concatenation was effectively free.
- Template downloads were duplicated under concurrency.
- Finalizer downloads were redundant.
- Upload latency dominated total execution time.

These observations guided every optimization that followed.

---

# 9. Trade-offs & Alternatives

## Promise Cache vs Buffer Cache

Promise caching was chosen because it naturally deduplicates concurrent requests.

Buffer caching alone would still allow multiple simultaneous downloads.

---

## Temporary Memory vs S3 Only

Keeping only S3 would simplify the architecture but require downloading every certificate again during finalization.

Temporary memory reduces redundant network traffic while keeping S3 as the permanent storage layer.

---

## Multiple Workers vs Monolithic Worker

Multiple workers introduce additional queues but provide:

- better separation of concerns
- simpler reasoning
- easier scaling
- clearer failure handling

---

## Polling vs WebSockets

Polling was selected initially because it is simpler and sufficient for the current workload.

Real-time progress delivery can be introduced later through WebSockets or webhooks without changing the worker architecture.

---

# 10. Future Improvements

Possible future enhancements include:

- streaming ZIP creation
- pipeline overlap between rendering and finalization
- horizontal worker scaling
- distributed cache
- retry backoff strategies
- dead-letter queues
- metrics dashboard
- structured logging
- WebSocket-based progress updates

These improvements primarily target scalability and user experience rather than correctness.

---

# 11. Lessons Learned

Several engineering principles became clear during the development of the worker subsystem.

- Measure before optimizing.
- Eliminate duplicated work before redesigning algorithms.
- Build observability early.
- Separate responsibilities across workers.
- Keep persistent state in the database.
- Use temporary caches only as performance optimizations.
- Avoid architectural complexity until profiling demonstrates a need.

---

# 12. Extra Notes

The worker architecture is intentionally conservative.

During development, several more aggressive optimizations were considered, including streaming ZIP creation while certificates were still rendering and redesigning the pipeline around overlapping stages.

These ideas were postponed because profiling showed that the existing architecture already performs well after targeted optimizations.

Future architectural changes should continue to be driven by production measurements rather than assumptions.

The worker subsystem should be viewed as an evolving foundation rather than a completed implementation. It was designed so that scaling strategies, caching improvements, or additional worker types can be introduced without fundamentally changing the overall pipeline.