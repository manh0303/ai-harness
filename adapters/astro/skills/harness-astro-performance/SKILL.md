---
name: harness-astro-performance
description: Reduce Astro page JavaScript, images and hydration cost while preserving accessible interactive tool behavior.
---

# Astro performance

## Input
Approved SA/ADR decisions for the affected scope, existing project conventions and actual stack versions. This skill implements accepted design; it does not select infrastructure, dependencies or architecture.
- Actual performance issue or quality goal, existing Astro build, package manager and route/island structure.
- Measurements from browser/profiler or build reports where available.

## Procedure
1. Record starting metrics and impacted routes (bundle sizes, network requests, Web Vitals if actually measured); do not invent baselines.
2. Eliminate unnecessary hydration and dependencies for static pages; defer noncritical interactive islands with appropriate client directives.
3. Lazy-load heavy optional transformations such as image/PDF processing; use worker threads/Web Workers only if browser responsiveness requires them.
4. Optimize responsive images, stable dimensions, fonts, critical resources, caching and third-party scripts under real deployment constraints.
5. Protect accessibility and all loading/empty/error/success states when splitting code or moving work to workers.
6. Confirm actual production build and compare before/after measurement in relevant device/network conditions.
7. Track regressions in Core review/tests; avoid setting arbitrary target numbers as approved NFRs.

## Output
- Minimal diff, before/after evidence where measured, regression tests and remaining bottlenecks.

## Constraints
- No performance claims based on development mode or guessed Lighthouse scores.
- Do not trade away privacy, usability or security solely for a smaller bundle.
- Do not add backend services without a demonstrated need.
