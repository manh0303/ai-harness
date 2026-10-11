# UI/UX capability (v1)

Reusable, **non-executable** skill and workflow bundle for permitted ideas/documents → requirements → UX → approved Figma design.

- Install selectively with `aih init --capabilities uiux`; combine with any technology adapter.
- Discover names and one-line descriptions with `aih skills`, then read one skill using `aih skill harness-uiux-figma-design`.
- Start from `workflows/docs-to-figma.md` or `workflows/idea-to-figma.md`.
- Project-owned source configuration, approved requirements and Figma IDs stay in the consumer, not the framework repository.
- Confluence and Figma connectivity must be configured separately in the AI host. The CLI does **not** implement a connector, invoke AI or create Figma frames by itself.
- Human approval is required before Figma writes and before marking designs ready to build. No implicit overwrites or merges.

Content is disclosed progressively: `aih skills` returns just metadata; the agent loads only the relevant `SKILL.md`. Installed files are snapshots pinned in `.harness/lock.json`.

When Product capability is installed, UI/UX consumes approved BRD/PRD, stories/AC
and preserves their IDs rather than regenerating competing requirements.
Without Product, UI/UX retains its own provisional evidence-extraction process.


## Full SDLC handoff

See [Full SDLC](../../docs/end-to-end-workflow.md), [Skill matrix](../../docs/skill-matrix.md) and [Full-stack web walkthrough](../../docs/examples/fullstack-web.md). UI/UX hands off reviewed screen specs/design tokens and optional Figma node IDs. Figma writes still need explicit approval and a configured host connector.
