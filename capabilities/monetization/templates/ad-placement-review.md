# Ad placement and UX review

Version: 0.1-draft | Status: pending-review | Owner: <reviewer> | Site/build revision: <SHA>

## Primary utility flows
| Tool/page | User action (Generate/Download/Submit etc.) | Critical clickable region | Evidence/screenshot |
| --- | --- | --- | --- |

## Proposed inventory
| Slot ID | Page / breakpoint | Intent / label | Separation from controls | Layout stability / no fill | Decision |
| --- | --- | --- | --- | --- | --- |
| ADS-001 | <route, mobile> | Advertisement | <reviewed screenshot> | <reserved space> | pending |

## Independent tests (report actual runs)
- [ ] Ads not styled as tool buttons/download/navigation
- [ ] Safe mobile tap targets and keyboard/focus path
- [ ] No unexpected CLS/content reflow near active controls
- [ ] No ads rendered without required consent/eligibility
- [ ] Tool succeeds without ads (blocked, empty/no-fill, offline where supported)
- [ ] Accessibility/contrast and touch behavior verified

## Risks, changes and approval
| Finding ID | Severity | Actual evidence | Remediation | Owner | Status |
| --- | --- | --- | --- | --- | --- |
| ADS-RISK-001 | <level> | <screenshot/build> | <change> | <owner> | open |

Publisher policy references (verify freshness):
- https://support.google.com/adsense/answer/1346295?hl=en
- https://support.google.com/adsense/answer/10025624?hl=en

Approval by named owner/date/revision: pending
