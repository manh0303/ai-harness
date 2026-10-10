# Add technology adapter capabilities and evidence-based CLI workflows

An adapter now carries focused rules, namespaced skills, advisory checks and agent evaluation scenarios.
Consumers can inspect detected stacks with `aih detect`, explicitly install via `aih init --detect`,
view pinned checklists with `aih verify`, and generate/score reviewer evaluation reports with `aih eval`.

All four adapters use strict JSON-compatible adapter.yaml schema 2. Nine technology skills are installed
alongside the five shared Core skills; eight evaluation scenarios are tied to installed bundle/dataset
hashes. Detection reads declared configuration files only; no new command executes builds or calls models.

Existing 0.1/0.2 installed snapshots migrate with schema-1 locks and conflict protection. User-owned files
survive; unmodified legacy adapter.json metadata is replaced. Custom source adapters must adopt schema 2.
Detection is heuristic and module-local. Evaluation aggregates human evidence, not automatic proof of compliance.

Validation: 56 tests, structure validation and actual offline npm global/local tarball smoke tests.
Remote Node 22/24 Ubuntu/Windows results are reported in PR checks. Live model evaluations, application
builds and upstream OpenSpec CLI validation are outside this run. No npm publication or automatic merge.
