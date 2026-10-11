---
name: harness-astro-microfrontend
description: Plan gradual evolution from an Astro multi-tool website to independently deployed micro frontends only when justified.
---

# Astro and optional micro frontend evolution

## Input
- Existing Astro route ownership, deployment system, tool teams, traffic and autonomy requirements.
- Target independence (separate deploys/releases/teams), shared navigation, SEO and auth constraints.

## Procedure
1. Distinguish modules in one repository, Astro Islands, route-level composition and runtime federation. Islands by themselves are not independent deploys.
2. Identify measurable splitting triggers: separate release cadences, operational ownership, major dependency conflicts or scale; avoid speculative MFE complexity.
3. Prefer a single Astro shell first, with each `/tools/<slug>` route owning its presentation, data transforms and tests behind small interfaces.
4. For an approved split, evaluate route/proxy-level deployment versus iframe versus runtime federation; document SEO, navigation, CSP, assets and browser security trade-offs.
5. Specify path/domain and cookie ownership, deep links, shared design conventions, analytics/observability and failure/rollback isolation.
6. Provide an incremental migration plan for one tool and validate end-to-end links, caches, hydration and consent. Keep the old route stable where possible.
7. Obtain explicit owner review before adding orchestration infrastructure or making deployment changes.

## Output
- A decision record with alternatives, boundaries, migration steps and tests for independently deployed tools.

## Constraints
- Do not describe a React island as MFE with autonomous deployment.
- Avoid introducing Module Federation, distributed auth or gateways without a clear release/ownership requirement.
- Do not promise zero migration effort or performance/SEO neutrality without evidence.
