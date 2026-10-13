---
name: harness-astro-project-architecture
description: Implement approved project boundaries with the actual Astro rendering mode, routes and integrations.
---

# Astro project support

## Input
Approved SA/ADR decisions, scoped requirements, existing conventions and actual Astro versions/output mode.
## Procedure
1. Inspect existing Astro config, routes/layouts, assets and configured commands.
2. Implement only accepted rendering, component and integration boundaries. Reuse comparable code.
3. Clarify consequential unresolved choices with SA/owner; do not choose hosting or add backend/DB/frameworks from a recipe.
4. Verify applicable route/build/browser behavior through authorized host tools and record evidence.
## Output
Scoped implementation, test evidence and handoff to QA/SA for actual gaps.
## Constraints
No mandatory micro-tools layout, cloud provider or deployment model; preserve approved architecture and user content.
