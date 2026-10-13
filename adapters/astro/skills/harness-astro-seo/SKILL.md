---
name: harness-astro-seo
description: Build discoverable and accessible Astro utility pages with accurate metadata, canonical URLs and sitemap rules.
---

# Astro SEO for useful utilities

## Input
Approved SA/ADR decisions for the affected scope, existing project conventions and actual stack versions. This skill implements accepted design; it does not select infrastructure, dependencies or architecture.
- Target search intent and approved page copy, routes, domain/deployment base URL and localization.
- Existing metadata, robots, sitemap integration, performance metrics and brand constraints.

## Procedure
1. Give every real tool route a distinct user-focused title, heading, helpful descriptive text, usage instructions and visible error states, not auto-generated thin duplicates.
2. Set meaningful meta description, canonical link and language/locale using validated domain configuration; avoid canonicals built from untrusted input.
3. Audit robots directives, sitemap scope, pagination and redirects according to current Astro integration and deployed route behavior.
4. Use structured data only when it truthfully describes the visible page and matches current search platform eligibility guidelines.
5. Ensure tools remain usable/accessibly labeled, keyboard-friendly and relevant without hydrating unrelated content.
6. Verify rendered HTML, indexing controls, responsive behavior, link correctness and actual production output.
7. Record what is measured versus proposed; analytics and external scripts need privacy review.

## Output
- Tool-specific metadata and route/indexing plan with documented build/browser verification.
- Search/discovery issues and recommended content improvements.

## Constraints
- Do not promise ranking, crawl dates or traffic numbers.
- Do not add schema spam, cloaking, mass duplicate routes or fabricated reviews.
- Avoid leaking user-uploaded/private data into metadata, URLs, logs or search indexes.
