# Engineering reference inventory

Reviewed 2026-10-17. NOTTH ships original focused instructions and templates, not copied upstream
bodies, scripts or a second orchestrator. Pins identify review baselines, not enforced external installs.

| Source | Reviewed commit | Use |
| --- | --- | --- |
| [Superpowers](https://github.com/obra/superpowers/tree/bb92a77741419a4ab5f06e711a283343f1ada0c3) | bb92a77741419a4ab5f06e711a283343f1ada0c3 | Compare planning, hypothesis-driven debugging, test/review discipline |
| [Vercel skills](https://github.com/vercel-labs/agent-skills/tree/063bee94c3f4df8453406c830b0a7df0f2860278) | 063bee94c3f4df8453406c830b0a7df0f2860278 | Select React performance, composition and React Native guidance |
| [arc42](https://github.com/arc42/arc42-template/tree/7c30430a52a915e8e8991774a1323704e6ba6ca0) | 7c30430a52a915e8e8991774a1323704e6ba6ca0 | Architecture coverage; original compact NOTTH outline, no compliance claim |
| [MADR](https://github.com/adr/madr/tree/ba75bb1b20d42af5746b246ad348c202419ae681) | ba75bb1b20d42af5746b246ad348c202419ae681 | Context, alternatives, consequences and decision history |
| [Spec Kit](https://github.com/github/spec-kit/tree/c6a4c18f1d01a8bec241c618eb6dfea952508744) | c6a4c18f1d01a8bec241c618eb6dfea952508744 | Compare specification quality; keep OpenSpec as change system |
| [Anthropic skills](https://github.com/anthropics/skills/tree/dbd4588f9e1033efb41dad4bef2f7947c8993d44) | dbd4588f9e1033efb41dad4bef2f7947c8993d44 | Optional document-format workflows, not bundled exporters |

Superpowers and Vercel repositories declare MIT; MADR offers MIT or CC0. No blanket redistribution
permission is assumed for arc42 or Anthropic materials. Anthropic's document skills are source-available
with separate license terms: inspect the exact selected LICENSE.txt and supporting assets before use or
redistribution. Linking a source is not permission to relicense it. Any future vendoring requires a
separate license/attribution/dependency review and complete supporting files.

If using an independently installed upstream skill: verify root/version/provenance, read its actual
body/resources and reconcile with accepted project conventions and host permissions first. Never
auto-install dependencies, enable deployment/upload, delete user code for TDD compliance, or spawn
workers merely because upstream requests it. No need to install complete Superpowers/Spec Kit workflows.
For Vercel guidance inspect project React/Next/RN versions; compiler/caching APIs and tool availability
vary. Official version-matched docs remain authoritative for actual APIs.

Java/Spring and database guidance is original NOTTH guidance, checked against actual project versions
and official sources when executing: https://docs.spring.io/spring-framework/reference/data-access/transaction.html,
https://docs.spring.io/spring-data/jpa/reference/, https://www.postgresql.org/docs/current/transaction-iso.html.
Oracle behavior must be checked in the project's version-matched Oracle documentation; PostgreSQL
semantics are not automatically portable. No broker/cache/cloud choice is implied.

To refresh pins inspect changes, license/prerequisites and relevant examples; update tests/evaluations.
Offline NOTTH instructions do not need upstream libraries; external execution and document rendering
may require separately available tooling. Report actual upstream use vs local NOTTH guidance honestly.
