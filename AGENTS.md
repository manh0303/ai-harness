# Working on ai-harness

This repository distributes instructions, adapters, and a local installer. It is not a model runtime.
Read README.md, docs/architecture.md, docs/versioning.md, and the relevant OpenSpec change.
Use Python 3.10+ standard library; do not introduce network calls or shell execution into the installer.
Verify the Git root before Git operations. Work on a feature branch; never merge automatically.
Run `python3 -m unittest discover -s tests -v` and `python3 scripts/validate.py`.
Preserve user content outside the managed AGENTS block. Fail on edited managed files, unsafe paths,
unmanaged collisions, invalid configuration, or overlapping source/target directories.
Keep the manifest, CHANGELOG, migration guidance and behavioral tests consistent.
Do not include client-specific information from reference workspaces, credentials, or Git history.
New skills in core/skills are repository assets; do not install them into personal assistant settings.
