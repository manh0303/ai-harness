# Change impact and architecture review

Input: scoped request/diff, current map/ADRs and actual evidence. Output: bounded reviewed change,
updated affected context and explicit residual risk.
1. Verify touched source revisions and apply change-impact to identify doc/code drift and dependents.
2. Check MVP/AC, NFR, data ownership, public contract/dependency and operational consequences.
3. Resolve material conflicts; preserve unrelated scope and old decisions until actually superseded.
4. Update only affected ADR/map/contract pointers and OpenSpec tasks. Return value changes to PO and
   sequencing/risk changes to Delivery. Avoid a full design pack for a small compatible fix.
5. Use harness-architecture-review on design/diff with actual lint/test/build/boundary evidence.
   State manual-only checks, skipped environments and author-vs-independent review explicitly.
6. Handoff findings, source paths, decisions, IDs, pending work and next owner; release follows DevOps.

Enter via Core `continuous-development.md` to reconcile the current baseline with the previous handoff. Record remaining work and separate implementation, merge and release evidence in the existing change; feedback stays proposed until an owner accepts scope.
