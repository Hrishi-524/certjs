# ADR-005 — Database as Source of Truth

Status: Accepted
Date: 2026-08-02

Related Architecture:
- 02-worker-architecture.md

Related Files:
- index.ts
- finalizer-worker.ts

---

## Context

Multiple workers process documents independently.

Completion status must survive process restarts and worker failures.

---

## Decision

Persistent database state determines batch completion.

Completion condition:

```
processed_count + failed_count == total_count
```

---

## Alternatives Considered

### BullMQ Job State

Rejected because queue state alone does not represent persistent application state.

---

### In-Memory Tracking

Lost during process restarts.

---

## Consequences

Positive

- Durable.
- Restart-safe.
- Easy to query.

Negative

- Requires additional database updates.

---

## Future Revisit Conditions

Maintain database as the source of truth even if queue implementation changes.