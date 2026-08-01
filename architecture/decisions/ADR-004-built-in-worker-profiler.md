# ADR-004 — Built-in Worker Profiler

Status: Accepted
Date: 2026-08-02

Related Architecture:
- 02-worker-architecture.md

Related Files:
- profiler.ts

---

## Context

Performance bottlenecks could not be reliably identified using ad hoc logging.

Optimization without measurements risked unnecessary architectural changes.

---

## Decision

Introduce a lightweight profiler with configurable logging levels.

Levels:

- minimal
- normal
- verbose

---

## Alternatives Considered

### console.time()

Useful for debugging.

Not reusable or configurable.

---

### External Monitoring

Premature for the project's current scale.

---

## Consequences

Positive

- Repeatable measurements.
- Configurable verbosity.
- Performance investigations become evidence-driven.

Negative

- Small maintenance overhead.

---

## Future Revisit Conditions

Integrate structured logging or metrics collection during production deployment.