# Security reports

Contact the repository owner privately through an agreed channel. Do not put live credentials,
production personal data or exploitable private infrastructure details in issues or PRs.
For a report, provide affected version, minimal synthetic reproduction, impact and suggested containment.

The installer trusts the source checkout and a non-hostile local filesystem. It protects against ordinary
path traversal, symlinks, accidental overwrite and configuration drift. It does not authenticate source
releases, sandbox agents, enforce access controls or guarantee recovery from process/power loss.
Review source provenance and use Git history for recovery. Run in an isolated working copy.
