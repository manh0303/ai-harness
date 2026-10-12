# Working on ai-harness

This repository distributes instructions, adapters, and a local installer. It is not a model runtime.
Read README.md, docs/architecture.md, docs/versioning.md, and the relevant OpenSpec change.
Before changing this Harness repository, read docs/harness-maintenance.md. Record all impact-matrix
areas in the active change or PR as done, pending or not-applicable with evidence/reasons; follow the
declaration-to-consumer link chain and report gaps honestly. This is not a consumer application rule.
Use Node.js 22+ built-in modules; do not introduce network calls or shell execution into the installer.
Verify the Git root before Git operations. Work on a feature branch; never merge automatically.
Run `npm test`, `npm run validate`, and `npm run test:package`.
Preserve user content outside the managed AGENTS block. Fail on edited managed files, unsafe paths,
unmanaged collisions, invalid configuration, or overlapping source/target directories (except a package installed under target/node_modules).
Keep the manifest, CHANGELOG, migration guidance and behavioral tests consistent.
Do not include client-specific information from reference workspaces, credentials, or Git history.
New skills in core/skills are repository assets; do not install them into personal assistant settings.
