# Traffic → advertising revenue review

Use when a legitimately deployed tool site has measurable organic traffic and/or authorized advertising data. No automation here pulls accounts or schedules reports.

1. **Collect with permission:** record actual source, owner, period, timezone, traffic geography/device segmentation, page views, estimated earnings, hosting/API/content costs and account limitations.
2. **Audit measurement:** check mismatched time windows, filters and sample sizes; page views are not ad impressions and Page RPM is not per-ad RPM.
3. **Compute and label:** `Page RPM = estimated earnings / page views × 1000`. If earnings are unknown, give **only** named scenario assumptions with a low/base/high range, never claim actual income.
4. **Measure real demand:** prioritize useful tools, search intent, original helpful content, engagement and legitimate organic growth. Avoid bots, click exchanges, forced scrolling or artificial impressions.
5. **Track unit economics:** variable Cloudflare/backend/API costs, paid acquisition if any, domain/content costs and estimated net contribution; include caveats for incomplete data.
6. **Quality guard:** validate ad placement mobile UX, nonintrusive navigation, page speed, privacy/consent and Core Web Vitals. Suspend a change if it harms tool usability or appears against current publisher rules.
7. **Decide experiments:** write `docs/monetization/analytics-report.md` with data sources, assumptions, review owner, specific proposed improvements and test/evaluation plan.
8. **Approve changes:** owner reviews suggested code, content, placement or spending changes before any provider/production write.

Use `harness-monetization-analytics-revenue`, `harness-monetization-seo-growth` and Product/UIUX/DevOps optionally. Always distinguish FACT (measured), INFERENCE (interpretation), FORECAST (explicit scenario) and UNKNOWN.
