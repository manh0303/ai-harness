# Reviewed external design sources

Inspected 2026-10-16. These are optional source pins, not installed packages or evidence of live use.
NOTTH owns the routing/direction/review instructions; no upstream prose, scripts or datasets are copied.
No new runtime dependency or network call is introduced into the CLI.

| Source | Reviewed commit | License at pin | Selected purpose |
| --- | --- | --- | --- |
| [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/tree/56ea9cf174ed86786187daa9de0e6247cb0747e4) | `56ea9cf174ed86786187daa9de0e6247cb0747e4` | MIT, Next Level Builder | Local searchable design knowledge |
| [Google Stitch Skills](https://github.com/google-labs-code/stitch-skills/tree/0337446dadde6f8c94210444e2aa9d546126480f) | `0337446dadde6f8c94210444e2aa9d546126480f` | Apache-2.0 | Brief refinement, design extraction, optional generation |

## UI UX Pro Max

At the pin, read `src/ui-ux-pro-max/templates/base/skill-content.md` as the upstream instruction source;
an installed platform skill resolves its script-path placeholders. For direct source use, actual entry
is `src/ui-ux-pro-max/scripts/search.py`. Preserve all scripts (including core.py, design_system.py,
reasoning_contract.py) and the sibling data tree, including stacks and provenance files; do not copy
only SKILL.md or a single script. Search requires Python 3 and standard-library modules, not npm.
The inspected data/scripts directories occupy approximately 3.6 MiB before packaging. Keep this library
optional rather than copying it into every NOTTH package and consumer snapshot.

After an authorized human has supplied the reviewed checkout, example read-only lookup:

```bash
python /reviewed/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "internal operations dashboard dense restrained" --design-system -f markdown
```

Replace the illustrative absolute path with the actual location. Query output is a recommendation,
not an approved design or measured accessibility result. Offline search does not make recommended
remote fonts/assets available offline. Reuse licensed local assets or disclose missing resources.

## Google Stitch Skills

Read only the selected body plus its referenced resources from the reviewed checkout:

| Path below repository root | Use / prerequisite |
| --- | --- |
| `plugins/stitch-utilities/skills/enhance-prompt/SKILL.md` | Structure an unclear brief; upstream requests current prompting documentation |
| `plugins/stitch-utilities/skills/taste-design/SKILL.md` | Optional opinionated direction; reject conflicting blanket font/color/layout bans and perpetual motion |
| `plugins/stitch-design/skills/extract-design-md/SKILL.md` | Source-only extraction; retain its references and examples; generated `.stitch/DESIGN.md` must be an agreed derived export if another master exists |
| `plugins/stitch-utilities/skills/design-md/SKILL.md` | Analyze actual Stitch project; requires project access |
| `plugins/stitch-design/skills/generate-design/SKILL.md` | Generate/edit variants; requires authorized Stitch MCP and prompt preparation |

Preserve complete skill folders and any referenced shared resources, along with LICENSE and applicable
NOTICE files when distributing upstream materials separately. Installing a folder does not connect MCP.
No Stitch free-tier, quota, native host activation or output-quality guarantee is made.

## Ownership and updates

Use project-owned local.md or an existing integration record for reviewed skill location, commit,
canonical design source and selected route. Do not place machine paths or credentials in locked assets.
User/host permissions and project decisions take precedence; upstream allowed-tools grants no authority.
To upgrade: inspect upstream diff/license/prerequisites, refresh this pin, test searches/integration
paths in the host, and rerun behavioral cases. Do not silently track main or duplicate each library for
every host. Roll back the external checkout and corresponding project decision separately from NOTTH.
