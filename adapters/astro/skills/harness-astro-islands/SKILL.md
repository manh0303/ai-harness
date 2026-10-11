---
name: harness-astro-islands
description: Apply selective Astro Islands and optional React integration without hydrating an entire lightweight website.
---

# Astro islands and React integration

## Input
- Astro page/component tree and identified interaction needs.
- Installed @astrojs/react or other framework integrations, versions, hydration constraints and UX requirements.

## Procedure
1. Separate static content from interactive islands and document which input/output needs browser state.
2. Prefer native forms and small browser scripts if sufficient; add a framework integration only when real complexity justifies its bundle cost.
3. For approved React components, confirm `@astrojs/react` setup and use `client:load` for immediately interactive UI, `client:idle` or `client:visible` when deferred hydration fits the UX.
4. Keep private logic, API keys and session enforcement on the server; do not confuse Astro server frontmatter with secret-safe client props.
5. Guard network requests against stale responses and unmount races; support keyboard interaction, loading/error/empty states and clear focus.
6. Inspect JS and hydration in actual browser/test builds; compare against a native Astro implementation.
7. Explain that islands in one Astro build are NOT separate deployable micro frontends; reference the microfrontend skill when independent releases are required.

## Output
- Small interactive island(s), hydration rationale, reviewed imports and client JS evidence.
- Tests for user-visible states and hydration behavior.

## Constraints
- Do not hydrate full pages automatically or require React for every tool.
- Do not claim framework islands provide Module Federation, independent team deployment or isolation by themselves.
- Keep credentials and private data off client props and browser bundles.
