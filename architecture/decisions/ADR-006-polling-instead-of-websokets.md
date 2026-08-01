# ADR-006 — Polling Instead of WebSockets

Status: Accepted
Date: 2026-08-02

Related Architecture:
- 02-worker-architecture.md

---

## Context

The frontend needs progress updates while batches are processing.

Several real-time communication methods were considered.

---

## Decision

Use periodic polling.

The frontend periodically requests batch status from the API.

---

## Alternatives Considered

### WebSockets

Lower latency.

Higher implementation complexity.

Connection lifecycle management.

---

### Webhooks

Better suited for server-to-server communication.

Not appropriate for browser clients.

---

## Consequences

Positive

- Simple.
- Reliable.
- Easy to debug.

Negative

- Small amount of repeated requests.

---

## Future Revisit Conditions

Introduce WebSockets when real-time progress becomes a product requirement.