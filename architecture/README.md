# CertJS Architecture

This directory contains the engineering documentation for CertJS.

Unlike traditional documentation that focuses on API references or code walkthroughs, these documents explain the reasoning behind the system's design. They capture architectural decisions, trade-offs, performance investigations, and lessons learned throughout development.

The goal is to preserve the context that is often lost over time:

- Why was this architecture chosen?
- What alternatives were considered?
- What problems were being solved?
- What performance bottlenecks were discovered?
- Which optimizations were implemented?
- What remains intentionally unimplemented?

These documents serve as long-term engineering references for future development, maintenance, interviews, and portfolio discussions.

---

# Philosophy

A repository tells **what** the code does.

Architecture documentation explains **why** the code exists.

Whenever a significant subsystem reaches a stable state, its design should be documented here before that context is forgotten.

The emphasis is on engineering decisions rather than implementation details.

---

# Repository Structure (Example)

```text
architecture/
│
├── README.md
│
├── 01-system-overview.md
├── 02-worker-architecture.md
├── 03-render-engine.md
├── 04-authentication.md
├── 05-api-design.md
├── 06-template-editor.md
├── 07-storage.md
├── 08-dashboard.md
├── 09-deployment.md
├── 10-performance.md
│
└── decisions/
    ├── ADR-001-worker-separation.md
    ├── ADR-002-promise-template-cache.md
    ├── ADR-003-finalizer-buffer-cache.md
    ├── ADR-004-profiler-levels.md
    └── ...
```

The numbering provides a recommended reading order but is not technically significant.

---

# Document Template

Most architecture documents follow a common structure.

```
1. Overview

2. Problem Statement

3. Design Goals

4. High-Level Architecture

5. Workflow

6. Core Components

7. Key Design Decisions

8. Performance Considerations (Optional)

9. Security Considerations (Optional)

10. Trade-offs & Alternatives

11. Future Improvements

12. Lessons Learned

13. Extra Notes
```

Not every document requires every section.

The structure is intended as guidance rather than a rigid template.

---

# Design Principles

Every subsystem should be documented using the following principles.

## Explain the problem first

Architecture should begin by describing the problem being solved before presenting the implementation.

---

## Explain decisions, not just implementation

Avoid writing:

> Uses BullMQ.

Instead explain:

> BullMQ was selected because asynchronous certificate generation prevents expensive rendering operations from blocking API requests and allows the worker subsystem to scale independently.

---

## Discuss trade-offs

Good engineering is rarely about choosing the "best" solution.

Instead document:

- alternatives considered
- reasons for rejection
- future conditions under which the decision should be revisited

---

## Keep implementation details in the code

Architecture documents should not duplicate source code.

Instead they should explain:

- responsibilities
- interactions
- reasoning
- assumptions
- constraints

---

## Measure before optimizing

Whenever performance improvements are made, document:

- the original bottleneck
- how it was measured
- the chosen optimization
- the resulting impact

This creates an engineering history instead of a changelog.

---

# Architecture Decision Records (ADR)

The `decisions/` directory contains focused Architecture Decision Records.

Each ADR documents one important technical decision.

Example:

```
Decision

↓

Problem

↓

Alternatives Considered

↓

Chosen Solution

↓

Consequences

↓

Future Revisit Conditions
```

These documents complement the broader subsystem architecture documents.

---

# Writing Guidelines

When creating a new architecture document:

- Focus on *why* rather than *how*.
- Prefer diagrams over long paragraphs where possible.
- Keep implementation-specific code snippets to a minimum.
- Document rejected alternatives.
- Explain engineering trade-offs.
- Record lessons learned during development.
- Update the document when significant architectural changes occur.

Architecture documents should evolve alongside the system rather than being written only after completion.

---

# Intended Audience

These documents are written for multiple audiences.

### Future Me

To preserve architectural context that would otherwise be forgotten months later.

---

### Contributors

To help new contributors understand the reasoning behind the system.

---

### Interviewers

To demonstrate engineering thought process rather than only implementation ability.

---

### AI Assistants

Modern development increasingly relies on AI-assisted code understanding.

These documents provide explicit architectural context that helps AI tools summarize the repository more accurately and answer design-related questions without relying solely on source code inference.

---

# Long-Term Vision

The architecture directory is intended to become the engineering knowledge base for CertJS.

Rather than documenting every feature, it should capture the significant decisions that shaped the project.

The ultimate goal is that someone unfamiliar with the codebase can understand:

- how the system works,
- why it was designed this way,
- what trade-offs were made,
- where the architecture can evolve,

without needing to reverse-engineer thousands of lines of source code.
