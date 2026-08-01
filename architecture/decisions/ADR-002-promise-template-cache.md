# ADR-002 — Promise-Based Template Cache

Status: Accepted
Date: 2026-08-02

Related Architecture:
- 02-worker-architecture.md

Related Files:
- template-cache.ts

---

## Context

Concurrent Certificate Workers processing the same batch originally downloaded the same template independently.

This produced redundant S3 traffic.

---

## Decision

Cache

```ts
Map<TemplateId, Promise<Buffer>>
```

instead of

```ts
Map<TemplateId, Buffer>
```

The first worker stores the in-flight Promise.

Subsequent workers await that Promise.

---

## Alternatives Considered

### Buffer Cache

Simple but vulnerable to race conditions.

Multiple workers may begin downloading before the first finishes.

---

### Redis Cache

Suitable for distributed workers.

Rejected because current deployment runs within a single process.

---

## Consequences

Positive

- Eliminates duplicate downloads.
- Naturally concurrency-safe.
- No locking required.

Negative

- Limited to one worker process.

---

## Future Revisit Conditions

Replace with distributed caching when workers execute on multiple machines.