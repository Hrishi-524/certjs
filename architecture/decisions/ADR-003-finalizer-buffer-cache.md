# ADR-003 — Temporary Finalizer Buffer Cache

Status: Accepted
Date: 2026-08-02

Related Architecture:
- 02-worker-architecture.md

Related Files:
- finalizer-buffer-cache.ts

---

## Context

Immediately after rendering, the Finalizer downloaded certificates from S3 that had just been uploaded.

This introduced redundant network I/O.

---

## Decision

Store rendered certificate buffers temporarily in memory.

The Finalizer first checks memory.

If unavailable, it automatically falls back to S3.

S3 remains the permanent source of truth.

---

## Alternatives Considered

### Always Download From S3

Simpler.

Introduces unnecessary network operations.

---

### Permanent Memory Storage

Rejected because S3 should remain authoritative.

---

## Consequences

Positive

- Eliminates redundant downloads.
- Faster finalization.
- No architectural dependency on memory.

Negative

- Only effective while workers share the same process.

---

## Future Revisit Conditions

Replace with distributed cache when workers become distributed.