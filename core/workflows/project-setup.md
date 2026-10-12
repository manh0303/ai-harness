# First-run project setup

Read AGENTS.md, local.md, actual build files and existing environment configuration first.
Use `aih setup` for structured suggestions; it never interviews the user or writes answers.
Do not ask about facts already established in the repository or current conversation.

1. Identify project scope, source documents, build/test commands and environment constraints.
2. Ask only missing consequential choices using the clarification workflow. Ask 1–3 questions
   per turn, with A/B/C options where suitable, a grounded recommendation and a free-text option.
3. For Java, inspect Maven/Gradle wrappers before proposing PATH or a custom tool. A wrapper is
   a recommendation only when present and consistent with project policy; do not switch corporate
   tools or download a replacement without authorization.
4. Record shared facts and decisions in `.harness/local.md`. Define exact tool IDs, argument arrays
   and required file paths in `.harness/environment.json`. Record evidence/source, not guessed versions.
5. For a machine-specific executable/file location, use `.harness/machine.json` or an environment
   reference. The machine file can only override declared paths. It does not override permissions,
   arguments, requirements or business decisions. Do not store passwords/tokens in either file.
6. Ensure `.harness/.gitignore` excludes `/machine.json`. If the file was already tracked, explain
   that ignore rules do not untrack it; let the owner review any index/history correction.
7. Run `aih doctor`. Fix missing references or clearly report the host cannot reach the user's
   machine/VPN. The host executes only reviewed commands with its own permissions. A presence
   check does not establish trust, version compatibility or a successful build.
8. Commit shared facts/configuration and the Harness snapshot after review. Preserve machine data
   locally. Once existing answers and authorization cover the task, continue without another
   redundant "may I start?" prompt.

Example: "Which Maven should this project use? A: existing Wrapper (recommended because mvnw is
present); B: Maven on PATH; C: internal Maven at a custom path. You can describe another setup."
If C is selected, ask for only the missing executable/settings locations. Do not request credentials.
