# CLI contract

Invocation: `aih COMMAND [--target /existing/project]`.
Node.js 22+; built-in modules only; no network, subprocesses, remote provider calls or dependency installs.
Output is JSON on stdout on success; errors use stderr. Drift reports from check use stdout with exit 1.
Exit 0 means the requested operation succeeded; 1 means validation/I/O/drift failure; 2 is a CLI usage error. Help and version are plain text; no arguments displays help.

| Command | Options | Effect |
| --- | --- | --- |
| init | --adapters a,b; --source; --dry-run; --allow-major | Install a snapshot; exact rerun is idempotent |
| update | --source; --dry-run; --allow-major | Update unedited owned files and seed missing project files |
| check | none | Compare installed files/block with lock and selection; no writes |
| doctor | none | check plus executable presence on PATH; no execution |
| new-change ID | none | Create an unapproved OpenSpec draft using installed templates |

All commands default --target to the current directory. --source defaults to the installed package.
--help/-h and --version/-v are available. Unknown, duplicate and inapplicable flags fail.
Source and target cannot contain one another, except source inside target/node_modules for local npm installs. Symlinks in roots, source
payload or destination paths are rejected. IDs are lowercase hyphenated slugs; archive is reserved.
Selection changes belong in .harness/project.json; unknown or duplicate adapters fail validation.

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
