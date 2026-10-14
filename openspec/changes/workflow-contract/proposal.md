# Workflow contracts and dual distribution

## Why
Workflow prose has no interchangeable machine contract, ready supports only two structural stages,
and eval reports require manual production. npm-only delivery is unavailable on restricted networks.
The README puts Kiro first despite supporting six hosts.

## What changes
- Add two schema-1 workflow contracts, graph/role/check validation and an installed workflow command.
- Preserve legacy readiness; add explicit workflow entry gates and declared external approvals.
- Keep optional conformance execution outside installer; capture Claude transcript/judge evidence and repeated trial rates.
- Build a dependency-free Python wheel/sdist from the shared npm payload; retain Node 22+ with no npm/npx requirement.
- Test both distributions and publish from one reviewed immutable release tag; centralize six-host harness-start guidance.

## Non-goals
No LLM gateway, Temporal driver, identity verification, production execution, host installation,
registry account creation, fake live results or automatic feature-PR merge/publish.
