# Performance, SEO and accessibility

- Page HTML, headings, canonical metadata and visible copy should work before optional JS hydration; include meaningful tool instructions and result/error states.
- Default to Astro server/static-rendered content. Use `client:idle`, `client:visible`, or `client:media` where interaction timing permits. Use `client:load` only for above-the-fold interactions that genuinely need it; `client:only` intentionally sacrifices server HTML for the island.
- Avoid shipping full UI frameworks for basic buttons/forms and avoid global shared SDK bundles. Prefer module splitting and lazy loading for heavy media/PDF/image modules.
- Prefer optimized images, defined sizes to reduce layout shift, appropriately loaded fonts, cached static assets and limited third-party scripts. Measure real production JS and Core Web Vitals; do not invent budgets or pass claims.
- SEO depends on content quality and discoverability, not URL farms. Each tool needs distinct useful descriptions, title/meta description, canonical links, accessible labels and appropriate robots/index decisions.
- Test keyboard flow, focus, empty, invalid, loading, success and error states as applicable. Validate behavior with and without JavaScript for parts intended to be static.
