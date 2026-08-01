# ADR-001 — Separate Certificate and Finalizer Workers

Status: Accepted
Date: 2026-08-02

Related Architecture:
- 02-worker-architecture.md

Related Files:
- index.ts
- finalizer-worker.ts

---

## Context

Certificate generation and ZIP creation represent two distinct stages of the document lifecycle.

An initial design option was to perform both rendering and ZIP generation inside a single BullMQ worker.

However, these stages have different responsibilities, execution frequencies, and failure characteristics.

---

## Decision

Split processing into two independent workers:

- Certificate Worker
- Finalizer Worker

The Certificate Worker processes individual documents.

The Finalizer Worker processes an entire completed batch.

---

## Alternatives Considered

### Single Worker

Simpler implementation but mixes rendering, uploads, ZIP creation, and batch completion into one long-running job.

Failures become harder to isolate.

---

### Separate Workers (Chosen)

Each worker owns one responsibility.

The Finalizer is triggered only after batch completion.

---

## Consequences

Positive

- Better separation of concerns.
- Easier debugging.
- Independent scaling.
- Smaller failure domains.

Negative

- Additional queue.
- Slightly more orchestration logic.

---

## Future Revisit Conditions

Revisit if future requirements require streaming ZIP generation or pipeline overlap.