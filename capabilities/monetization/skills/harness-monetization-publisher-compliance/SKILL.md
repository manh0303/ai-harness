---
name: harness-monetization-publisher-compliance
description: Review current advertising policies, ads.txt, regional privacy/consent and invalid traffic safeguards before publisher launch.
---

# Publisher compliance

## Input
- Exact ad network/product, target markets and known user audience, site URLs/content/third-party data handling.
- Observed publisher account status, ad placement plan and approved compliance owner.

## Procedure
1. Identify the *current* applicable provider policy and access date before giving a pass/fail opinion; distinguish product rules from local law.
2. Check site/content legitimacy and ownership, access restrictions, prohibited or sensitive content, and misleading ad placements.
3. Review [Google ad placement policies](https://support.google.com/adsense/answer/1346295?hl=en) and [invalid traffic guidance](https://support.google.com/adsense/answer/2660562?hl=en); prohibit self-clicks, incentivized clicks, bot traffic and ad/task confusion.
4. Confirm `ads.txt` path and authorized publisher entry using [official guidance](https://support.google.com/adsense/answer/12171612?hl=en). Treat it as highly recommended, not a universally mandatory precondition.
5. For EEA/UK/Switzerland traffic, evaluate [current Google-certified CMP and IAB TCF rules](https://support.google.com/adsense/answer/13554116?hl=en), as relevant to served ad types; require qualified review for local law and consent storage.
6. Verify privacy policy, data collection disclosure, retention, tracking behavior, cookie/consent revocation and no-ads fallback. Do not infer consent from an absent button.
7. Produce findings with severity, evidence URL/revision, remediation and reviewer; block unauthorized publishing or claims of "fully compliant" without evidence.

## Output
- `docs/monetization/privacy-consent-checklist.md` and launch gating decision: `needs-review`, `ready-for-provider-review` or `blocked`.
- Source list and checked date; responsibility assigned to the site owner/legal specialist when needed.

## Constraints
- Policy and legal requirements change. No compliance or AdSense-approval guarantee.
- No live remote accounts, privacy-law certifications, automatic CMP installation or publisher credentials implied.
- Do not bypass third-party platform restrictions or consent signals.
