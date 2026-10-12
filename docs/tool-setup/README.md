# Setup AI Harness with coding tools

Official discovery docs reviewed 2026-10-12. Authenticate/install the chosen host with its official
instructions, then run Harness in the actual repository. Host/version/account capabilities vary;
these are setup recipes, not a claim that native client behavior was tested in this workspace.

## Common setup
```bash
npm install -g @manhd_d/ai-harness
aih init --adapters java-spring --capabilities product,architecture,delivery
aih check
aih setup
aih doctor
aih skills
```
Node.js 22+ is required by Harness; app stack remains independent. Replace adapter selection with
react-nextjs/react-native/astro as appropriate. A coding-only maintain task can use just Core + adapter.
For an existing install, edit .harness/project.json and reviewed update --dry-run/update/check.

Fill .harness/local.md with mode, source docs/MVP/ADRs, public boundaries and actual commands; use
[project configuration](../project-configuration.md) for Maven/JDK/settings and ignored machine paths.
Do not bypass runtime permission policy or publish credentials. Configure GitHub/Figma/Confluence MCP
only when needed, with the host's official setup and authorized access; Harness does not connect accounts.

| Host | Project entry | Skill handling | Guide |
| --- | --- | --- | --- |
| Codex CLI/IDE | AGENTS.md and applicable nested/override instructions | .agents/skills native discovery | [Codex](codex.md) |
| Claude Code | Direct AGENTS support varies with current configuration/version; CLAUDE.md import fallback | .claude/skills wrapper when native slash invocation is desired; manual canonical read always possible | [Claude Code](claude-code.md) |
| Cursor | AGENTS.md; existing .cursor/rules may also apply | .agents/skills discovery | [Cursor](cursor.md) |
| Copilot | Client-specific AGENTS support or .github/copilot-instructions.md pointer | CLI supports .agents/skills; IDE support depends on client/version | [Copilot](copilot.md) |
| Gemini CLI | GEMINI.md import or context.fileName includes AGENTS.md | .agents/skills workspace alias | [Gemini CLI](gemini-cli.md) |

Preserve existing host files; merge only a reviewed pointer/import, never replace the whole config.
Bridges are project-owned and not managed by aih. Keep one canonical skill body in .agents/skills;
never copy every rule into each host config or advertise markdown role files as native agents.

## Read-only setup smoke test
Ask the host:
```text
Read the applicable AGENTS.md and .harness/local.md. Do not modify files or execute commands.
State the selected adapters/capabilities and exact installed paths for solution-framing and one
relevant skill. Summarize current project mode, known MVP/architecture decisions and missing facts.
Explain which declarations the configured test command comes from; do not claim any test ran.
```
Expected: actual source paths, correct selection and no fabricated file/command/result. If automatic
skill discovery fails, explicitly ask to read .agents/skills/<installed-name>/SKILL.md. `aih skills`
is a catalog, and `aih skill <name>` prints canonical instructions; neither invokes an AI model.

## Start prompts
| Task | Prompt |
| --- | --- |
| Idea → MVP | Read Product product-to-solution; clarify the useful user journey, in/out scope and minimum quality before proposing architecture. |
| Existing BA docs | Use the approved source/revision, extract only this change's requirements and gaps; preserve authoritative docs. |
| SA design | Read Architecture discovery-to-design; compare minimal viable options, NFRs and justified feature patterns with actual decision sources. |
| Maintain | Inspect touched module/code/tests and public common APIs; follow existing architecture and update only affected project-map entries. |
| Delivery | Plan value slices/dependencies using real team estimates; unknown dates remain unknown; link AC/ADRs/OpenSpec. |

## Update and troubleshoot
Update the global CLI, then review snapshot update --dry-run/update/check. Restart/reload host discovery
where required; read-only smoke again after setup changes. Keep custom host bridges and local.md.
If a managed file conflicts, reconcile with Git rather than editing lock hashes. Check workspace root,
nested override precedence, host context/trust settings, module selection and installed skill paths.
Private VPN/tool access may be unavailable remotely; report blocked builds rather than inventing success.
No logged-in host/MCP or live-agent smoke was run for these docs; follow each linked official guide.

## Agent/model preferences

Review [Agent configuration](../agent-configuration.md) and run `aih setup --host <id>` for a declared
routing plan. Validate native model/effort in the actual picker/client; no account availability is
probed or host config overwritten. Incompatible defaults need your explicit provider/model mapping.
