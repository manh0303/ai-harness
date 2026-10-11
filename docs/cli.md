# CLI contract

Invocation: `aih COMMAND [--target /existing/project]`.
Node.js 22+; built-in modules only; no network, subprocesses, remote provider calls or dependency installs.
Output is JSON on stdout on success; errors use stderr. Drift reports from check and failed evaluation reports use stdout with exit 1.
Exit 0 means the requested operation succeeded; 1 means validation/I/O/drift failure; 2 is a CLI usage error. Help and version are plain text; no arguments displays help.

| Command | Options | Effect |
| --- | --- | --- |
| list | --source | List validated adapters and namespaced skills |
| detect | --source | Read target build files and return heuristic matches with evidence |
| resolve | --source; --adapters a,b; --capabilities a,b | Validate module selection and compatibility; read-only |
| verify | --scope adapters/core/capabilities/all | Read installed advisory checks; executed false, no subprocesses |
| eval | --scope adapters/core/capabilities/all; --report FILE | Emit unscored template or aggregate reviewed report; no model calls |
| init | --detect OR --adapters a,b; --source; --dry-run; --allow-major | Install a snapshot; exact rerun is idempotent |
| update | --source; --dry-run; --allow-major | Update unedited owned files and seed missing project files |
| check | none | Compare installed files/block with lock and selection; no writes |
| doctor | none | check plus executable presence on PATH; no execution |
| new-change ID | none | Create an unapproved OpenSpec draft using installed templates |
| new-doc TYPE | none | Copy a selected locked Product template to `docs/discovery/` (idea, research) or `docs/product/` (other types) without overwriting |
| skills | none | List installed skill metadata only |
| skill NAME | none | Read one installed, locked skill |

All commands default --target to the current directory. --source defaults to the installed package.
--help/-h and --version/-v are available. Unknown, duplicate and inapplicable flags fail.
Source and target cannot contain one another, except source inside target/node_modules for local npm installs. Symlinks in roots, source
payload or destination paths are rejected. IDs are lowercase hyphenated slugs; archive is reserved.
Astro projects are detected from `astro` in package.json dependencies; `react-dom` used only for Astro islands is not a standalone React/Next.js detection when `next` is absent. Explicit `--adapters astro,react-nextjs` remains valid. `aih init --adapters astro` installs static-first rules/skills but no Astro packages or Cloudflare deployment.\nSelection changes belong in .harness/project.json; unknown or duplicate adapters fail validation.

## Optional monetization capability

`aih init --capabilities monetization` installs five stack-independent advertising/revenue skills and 2 Markdown workflows with 4 templates. Combine with `--adapters astro` or `react-nextjs`; `product` and `uiux` are optional. `aih verify --scope capabilities` gives an unexecuted manual publisher policy/consent checklist. `aih new-doc` is **Product-only**; the editor may copy installed monetization Markdown templates to user-owned `docs/monetization/` with explicit no-overwrite review. No Google account access, ads publishing or metrics APIs are provided. See [Monetization guide](monetization.md).

## Ownership and conflict behavior
AGENTS.md ownership covers only text between the unique start/end markers, inclusive. Any modification
inside the block is drift; text before/after is user-owned. A malformed marker pair fails safely.
The snapshot and exposed harness skills are fully owned files. init refuses different unmanaged content;
identical content can be adopted. Existing OpenSpec config is project-owned and preserved, not validated
by this CLI. Run the upstream OpenSpec validator for spec/config correctness.
check detects changed/missing locked files and mismatched adapter selection. It does not verify all
application code, external tools, remote origin or model behavior. The lock is not a cryptographic signature.

## Recovering failures
For conflicts, preserve custom work in Git, move project-specific rules to local.md and restore managed
files from the last install commit. Re-run dry-run. Do not manually regenerate hashes to suppress drift.
For an interrupted install inspect .harness-install.lock, confirm no installer is running, remove the
stale marker and restore a known-good installation from Git. Then check and retry on a branch.
There is no uninstall command; revert the installation commit. No command merges or publishes changes.

## Capability commands
list/detect read the CLI package or explicit --source. verify/eval require a valid installed snapshot and
read its pinned metadata, rules and cases. Every referenced capability file must be covered by the lock.
Detection reads only declared paths directly in --target, capped at 1 MiB per file; malformed package JSON
and symlink probes fail. It does not infer framework versions or recurse into workspaces/node_modules.
init --detect refuses empty detection; it cannot be combined with --adapters or used on update.
verify labels file presence as candidate/not-detected, and manual checks as review-required. This is not
proof that a script exists, a command is safe, or a native toolchain is available. Commands are never run.
eval without --report emits {dataset, report}; save/edit only the report object as the submission.
Missing metadata, null/nonboolean scores, missing/duplicate/unknown cases or stale hashes fail validation.
Any false criterion returns status fail and exit 1, including a list of critical failures where relevant.

## Selective capabilities and progressive skill loading (0.4.0)

- `aih init --capabilities uiux` is optional and independent of `--adapters`.
- `aih list` returns a `capabilities` array alongside adapter metadata.
- `aih skills` lists **installed** names/descriptions and paths only (no full skill bodies).
- `aih skill harness-uiux-figma-design` returns only that single installed, locked skill text.
- Invalid, duplicate and unknown capability IDs fail before installing. Custom capabilities must have a registered and valid source manifest.
- For existing installs, edit the `capabilities` array in `.harness/project.json`, then use `aih update --dry-run` followed by `aih update`. Init refuses an already installed conflicting selection.
- Selecting a capability copies only its managed snapshot and exposed skills into the consumer. npm package transport itself still contains all bundled capabilities.
- Neither `skills` nor `skill` contacts the network or runs model/tool integrations. Both require a drift-free installed snapshot.

## Product docs and safe template scaffolding (0.5.0)

- `aih init --capabilities product` or `aih init --capabilities product,uiux` installs
  Product workflows, role contracts, document templates and skill pointers.
- `aih list` returns capability agents/templates metadata alongside skills/workflows.
- `aih new-doc brd`, `aih new-doc prd`, `aih new-doc backlog`, etc. safely
  copy **one** locked template from `.harness/capabilities/product/templates/` to
  the project-owned `docs/product/<type>.md`. An existing file is never overwritten.
- `aih skills` lists descriptions only; `aih skill harness-product-brd-generation`
  loads specific task guidance when needed.
- For installed projects, change `.harness/project.json` selection and run update/check.
- Documents must be populated by an authorized AI host using source references;
  no command retrieves Confluence, calls an LLM or claims stakeholder approval.

## Module composition (foundation hardening)

`aih resolve --adapters java-spring,kubernetes --capabilities product,uiux,devops` is read-only and validates dependencies, conflicts, version metadata, and declared compatibility before install. Optional recommendations only warn. Init/update use the same resolver.

## Unified eval scopes

`aih verify --scope all` and `aih eval --scope all` include the Core and installed capability/adapter contracts plus matching cross-module scenarios. `adapters` is the unchanged default for backward compatibility. `capabilities` and `core` isolate those cases. Older installed snapshots without Core evaluation assets must be upgraded first. The CLI emits advisory checks and a human-scored report; it never executes provider commands or AI evaluations.

## Human workflows and examples

See [Getting started](getting-started.md) for CLI boundaries, [Full SDLC](end-to-end-workflow.md) for review gates, [Skill matrix](skill-matrix.md) for valid skill IDs and [Agent handoffs](agent-handoffs.md) for role responsibilities. The four [examples](examples/fullstack-web.md) distinguish advisory `aih` commands from external build, AI and deployment tools.


## Product document templates — discovery and specifications

With the optional `product` capability selected, `aih new-doc idea` and `aih new-doc research` safely create `docs/discovery/<type>.md` in the consumer repository. Other names including `prd-lite`, `srs` and `use-cases` create `docs/product/<type>.md`.

All types must be declared templates in the installed, hash-locked Product manifest. Commands refuse unknown names, traversal, overwrite, collisions and installation drift. These are **blank templates only**, not AI-generated content. Read [Documentation workflows](documentation-workflows.md) for the two intake paths and approvals.
