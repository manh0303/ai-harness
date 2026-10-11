# Architecture — Astro micro-tools

- Default to static-first Astro pages, layouts and small TypeScript utilities. Prefer browser-local APIs for QR generation, formatting, small image operations and similar no-server tasks.
- One website may host many tool routes: `src/pages/tools/<tool>.astro`, shared layouts, reusable UI and isolated `src/lib/<tool>/` functions. Avoid centralized mutable state and coupling between unrelated tools.
- Choose `output: 'static'` when routes need no runtime rendering. Confirm target Astro version and adapter compatibility before introducing on-demand SSR, actions, API routes or server middleware.
- A tool with secret credentials, restricted APIs, large server jobs or authoritative writes needs a separately justified secure server boundary. Keep secrets out of browser bundles and build output.
- Reuse existing UI/design and semantic HTML. React islands are optional and load only where genuine interaction needs them; static Astro pages should not inherit a full React runtime.
- Discuss a monorepo only when there are shared packages, coordinated releases or truly independent teams; a tools folder is enough initially.
- Keep architecture decisions reversible: one tool owns its UI, data transformations and tests; dependencies cross via explicit interfaces.
