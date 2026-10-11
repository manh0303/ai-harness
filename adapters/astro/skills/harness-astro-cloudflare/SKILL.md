---
name: harness-astro-cloudflare
description: Review static hosting and Cloudflare Workers deployment choices for Astro micro-tools with secret-safe server boundaries.
---

# Astro + Cloudflare

## Input
- Astro version/output mode, actual build scripts, target account and approved deployment environment.
- Need for static assets vs on-demand SSR/API, secrets, domains, regional and data constraints.

## Procedure
1. Start with static hosting/CDN for browser-only tools. Establish whether a Worker is necessary before introducing server code.
2. Consult current Astro and Cloudflare documentation for Workers-compatible adapters, SSR support and deployment integration; do not assume a legacy Pages adapter is always required.
3. Review supported configuration, runtime APIs, environment bindings, routes, assets, request/response limits, error handling and cache rules for the selected plan.
4. Keep secrets in server-only bindings and host secret stores. `PUBLIC_*`-exposed values are not secrets.
5. If proxying public remote content, enforce domain allowlists, redirect/IP restrictions, quotas, payload limits and upstream permissions. If network protections are not robust, refuse arbitrary URL fetching.
6. Generate reviewable deployment/rollback steps and preview tests; request explicit approval before real Cloudflare writes, DNS changes or production release.
7. Measure actual cost and usage from official account metrics rather than projecting guaranteed free usage.

## Output
- Static or Worker decision with rationale, config/release plan, security findings and test evidence.

## Constraints
- No automatic `wrangler deploy`, cloud login, domain changes or production writes.
- No fabricated current Cloudflare quotas/prices or Astro adapter compatibility.
- No bypass of third-party platform authentication/privacy controls.
