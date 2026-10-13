# Context and repository boundaries

Use progressive loading: root AGENTS → applicable project facts → active change → relevant adapter →
one skill and nearby source/tests. Do not flood the prompt with every policy or every Confluence page.
Record a compact context map: source, revision/date if available, relevant section, decision supported.
Link external requirements and Figma nodes; keep only the minimum excerpt needed for implementation.
If sources disagree or are inaccessible, mark the uncertainty explicitly before choosing behavior.

For multi-repo work list affected repositories, owner, base branch, shared change ID and merge order.
Confirm `git rev-parse --show-toplevel` in each repo. Never stage child repos from a workspace parent.
Run tests in the repository that owns the behavior and link sibling PRs. A shared branch name is a
coordination convention, not a guarantee that dependencies are available.

Begin document retrieval with search and explicit paths. Introduce RAG only when retrieval measurements
show a need. Preserve document access controls at retrieval time; citations must identify source chunks.

For a new change or resumed session, apply `.harness/core/workflows/continuous-development.md`.
Compare current source revisions, scoped working-tree edits and evidence with the previous handoff.
Refresh affected assumptions in the existing change/project map; stale summaries never override sources.
