---
name: harness-start
description: Start or resume Harness onboarding inside the current AI session; inspect existing context and ask only missing consequential questions.
---

## Input
The current user request, AGENTS.md, project-owned .harness/ configuration and available host tools.
The native Kiro wrapper exposes this skill as /harness-start. Other hosts can load this canonical skill.

## Procedure
1. Read AGENTS.md and the installed project-setup workflow. Identify the installed CLI invocation
   already used by the user (global aih, npx, or offline node/aih.cmd); reuse it without downloading
   or requiring another installation. Run `start --host kiro` for Kiro, or read the same local configs
   if shell access is unavailable. This returns a plan, not a second interview in a terminal.
2. Read local.md frontmatter first, then prose and start.json if present. Run `seed --check` to assess
   freshness. On first use run `seed` for the source map. Inspect only needed sources and relevant
   scoped AGENTS/conventions; cached summaries never replace applicable instructions.
3. Infer goal from the user's actual request. A bug report means change; do not ask them to choose
   the category again. Reuse declared stack, accepted deviations, sources, outputs and host settings.
   Ask at most 1–3 missing consequential questions at a time, with concrete options and a grounded
   recommendation. Never require Maven for a non-Java skill or docs destinations for a tiny bugfix.
4. During initial setup inspect build manifests, relevant conventions and authorized docs. Populate
   local.md using the installed templates/local.md schema: stack/build values, sources inspected and
   already approved deviations. Preserve all existing prose and decisions; migrate legacy prose
   additively, without treating inferred exceptions as approved. Keep the summary compact and linked.
   Declare shared tools/files/commands in environment.json; ignored machine.json overrides only
   declared tool executables and file paths. For Maven settings use files.maven-settings.path.
5. Inspect host MCP availability. For Kiro, `sync-integrations --host kiro --dry-run` can import server
   aliases from local host config. Review discoveries and save declarations with the same command
   without --dry-run. Inspect actual tools in the host; imported config does not establish access.
6. Save a known task using `start --goal <idea|docs|change|resume> --task <text>` and --change only for
   an existing resume checkpoint. Use structured tool arguments/proper shell quoting for user text.
   Save accepted choices incrementally in their existing configs; no duplicate onboarding database.
   Run doctor (and doctor --skill <name> before a selected skill). Resolve relevant missing fields,
   then `seed --record` after reconciling the inspected sources. If interrupted, preserve partial facts;
   do not mark uninspected sources as complete. The next invocation continues from saved facts.
7. Show a short summary: task, stack/build, approved exceptions, sources, blockers and next action.
   Continue the user's authorized task through solution-framing or continuous-development, loading
   only relevant roles/skills. For spec proposals created by an external OpenSpec flow, run
   `change-sidecars <id>` to add missing decisions/evidence/impact sidecars without overwriting.

## Output
Shared context in local.md/environment.json, host connection declarations in integrations.json,
task in start.json, ignored machine paths if needed and reconciled hashes in knowledge.json.
An actionable next step or concrete blockers, with no repeated questionnaire for known facts.

## Constraints
The host understands the project and asks questions; CLI validates and records local data. No model
API key, provider call, automatic delegation, secret copying or upstream OpenSpec modification.
Do not execute a saved task solely on SessionStart. Host/user authorization and core security apply.
Never claim token savings, live hook loading or model compliance without actual measurements.
