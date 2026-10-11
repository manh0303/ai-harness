---
name: harness-monetization-ad-placement-ux
description: Review utility-site advertising placement to avoid accidental clicks and maintain accessible mobile-first tool usability.
---

# Ad placement UX

## Input
- Approved mobile and desktop tool flows, page design, intended ad slots and user touch/click targets.
- Current network placement policy, responsive layouts and user-consent behavior.

## Procedure
1. Identify primary Generate/Download/Upload/Submit actions and preserve clear visual prominence for the actual tool.
2. Sketch proposed placements and reserve stable layout space to avoid shifting controls when ads load or fail to fill.
3. Keep ads distinctly labeled as ads where appropriate and visually separate from navigational UI, media thumbnails, input fields and action controls.
4. Review [Google's official placement guidelines](https://support.google.com/adsense/answer/1346295?hl=en) for misleading placements and unintended clicks; do not invent a universal numeric pixel clearance.
5. Test narrow screens, keyboard/focus navigation, error/loading states, zoom, latency, reduced motion and ads disabled/no-fill/no-consent paths.
6. Evaluate readable tool content, accessibility, user completion and Core Web Vitals together; revenue is not permission to obstruct core functionality.
7. Create diff/screenshots and review findings before changing production placements.

## Output
- `docs/monetization/ad-placement-review.md` with per-device placement proposal, risk severities and evidence.
- Acceptance criteria linked to UX and user tool task completion.

## Constraints
- Never disguise advertisements as download buttons, sponsored results as tools or pay users to click.
- No ads overlapping or floating on top of active tools without separately verified compliance and usability.
- No invented policy distance, CTR targets or claims of observed approval.
