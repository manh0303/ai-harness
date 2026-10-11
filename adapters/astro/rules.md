# Astro adapter — static-first micro-tools

Astro should be the light, SEO-friendly shell for independent small utilities. Use TypeScript and browser-native capabilities by default. Prefer **zero backend and zero database** until a requirement justifies them.

## Read before implementation
- Inspect installed Astro version, package manager, routes, integrations, output mode and actual scripts. Never assume a Vite or Astro minor-version API.
- Read `rules/architecture.md`, `rules/security.md`, `rules/performance.md`, `rules/deployment.md` and only the relevant namespaced skills.
- Distinguish static HTML, hydrated UI islands, server routes and **separately deployable** micro frontends. Astro Islands are not Module Federation.
- Avoid adopting React, Tailwind, SSR, a Cloudflare adapter, API/server, storage, auth or a monorepo just because they are available.

## Safe workflow
Product approval/requirements → route/tool boundary and privacy model → static-first code with minimal client JS → real build/UX tests → reviewed release. Do not run deployments, fetch unauthorized third-party content or assert permissions without evidence.

## Verification
`aih verify` returns checklists without running commands; inspect package scripts and execute checks through an authorized host. Keep Core TDD/debugging/review; optional Product/UIUX/DevOps provide cross-cutting workflows.

Official references: https://docs.astro.build/en/guides/framework-components/ and https://docs.astro.build/en/guides/deploy/cloudflare/.
