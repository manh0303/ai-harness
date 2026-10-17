# React / Next.js adapter

## Design authority
Actual host/user permissions apply. For design within its scope: approved SA/ADR decisions > existing project conventions > adapter defaults. Proposed technologies need alternatives, trade-offs and an owner decision before implementation; accepted choices are reused without asking again. Selecting this adapter does not select any infrastructure or pattern.

Inspect package.json, lockfile, router choice, TypeScript settings and project scripts. Do not assume npm,
App Router or a Next.js version; plain React projects use only the applicable rules.

## Boundaries
Keep secrets and privileged operations server-side. Never place them in browser-exposed environment variables.
Enforce authorization in server handlers/actions; hiding UI is not access control. Validate inputs at the boundary.
For App Router, use server components where appropriate and narrow client boundaries for interaction.
Make cache scope, revalidation and user-specific data isolation explicit. Do not cache private data publicly.

## UI behavior
Reuse the design system. Cover loading, empty, error, success and disabled states. Use semantic HTML,
keyboard access, labels, focus handling and responsive layouts. Sanitize untrusted HTML.
Avoid effects for derivable state. Handle stale requests, cleanup and races; preserve accessible feedback.

## Verification
Use existing scripts and package manager; don't invent missing scripts or run next lint unconditionally.
Test components by user-visible behavior and critical flows in a browser. Add API/server authorization cases.
Run type checks, configured lint, relevant tests and production build. Test SSR/hydration when touched.
For plain React skip server-component/Next-specific checks and document its actual build setup.

## Capability index

For state/data/render/performance changes read rules/engineering.md with actual project versions.
Avoid automatic memoization, cache assumptions, deployment or library migration.

Read rules/conventions.md before coding, then relevant rules/architecture.md, rules/security.md,
rules/database.md and rules/performance.md. Project conventions take precedence over adapter defaults.
Use only relevant adapter skills listed in adapter.yaml; core TDD, debugging and review remain shared.
Use harness-react-nextjs-feature-delivery for route/form/API/state slices and
harness-react-nextjs-behavior-testing for component/integration/browser evidence. Load accessible-ui
or server-boundaries only for the corresponding risk; do not load every body for a simple task.
Review checks/verification.yaml before choosing commands. No check executes automatically.
