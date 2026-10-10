---
name: harness-react-nextjs-server-boundaries
description: Implement Next.js server operations with isolated authorization and caching.
---

# server-boundaries

## Input
Actual router/version, server action/API contract and data access policy.

## Procedure
1. Identify server-only dependencies and keep secrets out of client imports.
2. Validate input and enforce resource authorization for each operation.
3. Document cache scope and revalidation after writes; isolate private data by identity.
4. Test unauthorized calls directly, cross-user cache behavior and SSR/hydration where touched.

Use core TDD, debugging and review procedures for the common development lifecycle.

## Output
Server/client boundary changes and authorization/cache tests.

## Constraints
Apply only to Next.js/server-enabled projects; do not add Next.js to a plain React app.
