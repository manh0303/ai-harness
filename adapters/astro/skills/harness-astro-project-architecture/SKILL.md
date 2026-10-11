---
name: harness-astro-project-architecture
description: Design static-first Astro micro-tool websites with TypeScript, isolated tool modules and minimal infrastructure.
---

# Astro project architecture

## Input
- Approved problem, tool pages, audience, expected traffic, user data and quality requirements.
- Existing Astro version, package scripts, router/layouts, deploy mode, optional integrations and lockfile.

## Procedure
1. Inspect existing `astro.config.*`, `package.json`, routing and tool dependencies; avoid inventing a new project if one exists.
2. Prefer static HTML/TypeScript/browser APIs, one `src/pages/tools/<tool>.astro` route per tool and a small dedicated library module for each tool's logic.
3. Separate tool UI, pure transformations, validation, side effects and test fixtures. Share layouts/design tokens only when multiple tools need them.
4. Only introduce server endpoints for justified access control, secrets, trusted writes or compute. Record backend/data costs and alternatives; default to no database.
5. Define route ownership, error/empty/success states and storage/privacy expectations; only add React islands for genuinely stateful interaction.
6. Design stable boundaries so a heavy tool may later move to independent hosting without making the initial app a complex micro frontend platform.
7. Follow the Core spec → test → review flow; verify actual build/route behavior with existing project scripts.

## Output
- An architecture decision and route/module map; minimal Astro/TypeScript changes tied to approved requirements.
- Actual test/build evidence, plus deferred infrastructure decisions.

## Constraints
- Avoid premature microservices, shared state stores, module federation, Redis, Kubernetes or mandatory authentication.
- Don't silently add packages, cloud resources, telemetry or external data access.
- `aih` distributes guidance; it does not scaffold or execute an Astro project.
