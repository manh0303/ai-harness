---
name: harness-monetization-adsense-integration
description: Plan reviewable Google AdSense setup and safe web ad integration without promising approval or enabling invalid traffic.
---

# AdSense integration

## Input
- Legitimate, publisher-owned public website and confirmed site/domain ownership.
- Current approval/account status, target markets, content/tool pages, legal/consent requirements and deployment stack.
- Authorized publisher ID, if supplied by the owner; never make one up.

## Procedure
1. Confirm site offers original, accessible, useful content/features and user trust pages; flag thin/duplicate utility pages and deceptive content.
2. Consult current [Google AdSense program and placement policies](https://support.google.com/adsense/answer/1346295?hl=en), never assume approval or a guaranteed monetization rate.
3. Identify verified account/site status and the exact host/runtime; prepare an *optional* implementation plan for Google-provided snippets after explicit approval. No credentials, remote account changes or speculative snippets.
4. For `ads.txt`, use [Google's guide](https://support.google.com/adsense/answer/12171612?hl=en); confirm owner's actual seller entry, serve at root `/ads.txt`, check the deployed URL and allow for provider propagation. Google recommends but does not universally mandate ads.txt.
5. Specify ad loading/consent boundaries, safe defaults when ads do not fill or are blocked, and how the core tool remains usable without ads.
6. Require screenshot/browser review at mobile/desktop widths, accessibility and CLS/layout verification before publishing.
7. Ask authorized owner to review provider policy, final site scope and deployment diff. Record actual approval status only from observed provider evidence.

## Output
- A reviewed integration plan, exact deployment/env requirements, placement inventory and evidence/unknowns in `docs/monetization/site-monetization-plan.md`.
- Optional code diff *only when runtime and publisher credentials are genuinely available and owner approved*.

## Constraints
- No fabricated publisher ID, guaranteed approvals, revenue, site ownership or consent.
- Never ask users to click ads, arrange fake traffic, or make ads resemble form, navigation or download buttons.
- The `aih` CLI cannot fetch provider status, integrate APIs or deploy ad code.
