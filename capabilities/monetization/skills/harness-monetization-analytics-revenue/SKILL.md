---
name: harness-monetization-analytics-revenue
description: Measure page views, page RPM, legitimate ad earnings and hosting costs with reproducible definitions and assumption-labeled scenarios.
---

# Ads analytics and revenue

## Input
- Authorized, time-scoped site analytics and advertising earnings exports, if connected.
- Host/CDN/API costs, traffic geography/device mix and goals/constraints.

## Procedure
1. Define metric contracts: page views vs sessions vs ad impressions, estimated earnings vs paid revenue, currency, timezone and date range.
2. Compute `Page RPM = estimated earnings / page views * 1000` when both measurements exist for the **same interval**. Never confuse Page RPM with ad impression RPM.
3. When revenue is not observed, model `estimated revenue = modeled page views / 1000 * assumed Page RPM` as explicit scenarios, not predictions or guaranteed AdSense performance.
4. Separately track hosting, API, bandwidth, tooling and content costs. Report net contribution and break-even with transparent inputs and exclusions.
5. Compare per-tool contribution and organic acquisition without recording raw sensitive URLs, IP addresses or other personal data unnecessarily.
6. Flag insufficient sampling, ad blockers, region and device variation, invalid traffic concerns and provider-report latency; do not claim precise ROI without data.
7. Prepare a periodic review with actions, confidence, experiment ownership and the earliest evidence required to revisit assumptions.

## Output
- `docs/monetization/analytics-report.md` with source dates, defined KPIs, scenario table, assumptions and proposed decisions.
- Traceable monthly/weekly review with owner sign-off if used to authorize spend.

## Constraints
- Never fabricate analytics access, RPM benchmarks, user demographics or paid earnings.
- Never recommend manipulating engagement, refreshing ads improperly, generating fraudulent traffic/clicks, or exposing user tracking secrets.
- Treat estimates, actuals and forecasts as distinct fields.
