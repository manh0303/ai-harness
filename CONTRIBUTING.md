# Contributing

Create a feature branch and an OpenSpec change for meaningful behavior or policy changes.
Keep executable behavior tests alongside CLI changes. Document adapter expectations without pinning
consumer application versions arbitrarily. Do not run a model evaluation with secrets or production data.

Use Node.js 22+ and npm. Run `npm test`, `npm run validate`, and `npm run test:package` from the root.
The package smoke test installs the actual tarball globally and locally using a temporary offline npm cache.
Update CHANGELOG and the version/migration guidance when releasing. Have a human inspect the install
diff, not only generated hashes. Open a PR; do not merge automatically or enable auto-merge.

Use original instructions or properly licensed attributed content. Do not copy proprietary workspace
details or third-party skill source into this repository. No open-source license grant is made by default;
the repository owner can select a distribution license separately.
