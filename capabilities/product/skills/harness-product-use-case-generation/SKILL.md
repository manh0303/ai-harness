---
name: harness-product-use-case-generation
description: Translate requirement and story IDs into consistent main, alternative and error use cases for implementation and testing.
---

# harness-product-use-case-generation

## Input
- PRD/SRS, approved stories, actors, business rules and relevant acceptance criteria.
- Existing use cases and source/decision register.

## Procedure
1. Assign stable `UC-###` IDs and link each use case to `FR-###`, `US-###` and source anchors.
2. Capture actor, goal, trigger, preconditions, postconditions and essential business rules.
3. Detail numbered main success steps, alternate branches, validation errors, permission denials and recovery paths.
4. Cover external service failures, retries/idempotency and concurrency only when relevant; highlight choices that need human decisions.
5. Check that the use case behavior matches PRD/SRS and can be translated to test scenarios.
6. Keep old IDs stable when requirements change and mark superseded use cases instead of silently replacing them.

## Output
- `docs/product/use-cases.md` with traceable `UC-###` scenarios and pending decisions.

## Constraints
- Never imply a draft flow is accepted without sign-off.
- Avoid duplicating product scope in a competing document; reference established IDs.
- No assumptions about system behavior presented as approved facts.
