# npm installation and release

Requires Node.js 22+ and npm. The proposed package name is `@manh0303/ai-harness`.
This repository does not assert that the npm scope is owned or that the package is published.
The repository remains private; publishConfig defaults to restricted access. No workflow publishes.

## Install before registry publication
From the reviewed checkout, run:

```bash
npm test
npm run validate
npm run test:package
npm pack
npm install -g ./manh0303-ai-harness-0.3.0.tgz
cd /path/to/existing-project
aih init --adapters java-spring,react-nextjs
aih check
```

The tarball contains the framework and no runtime dependencies; installing it requires no Python.
For a project-local tool, use `npm install --save-dev /absolute/path/manh0303-ai-harness-0.3.0.tgz`,
then `npx --no-install aih init`. Keep the tarball available to teammates/CI or replace the dependency
with the eventual authenticated registry release. Do not commit a dependency pointing to your personal
absolute filesystem path. A private registry requires its own authentication, separate from GitHub.

## Maintainer release checklist
After human review/merge, verify ownership of the npm scope and availability of restricted publishing
for the selected account. If the scope changes, update package metadata, lockfile and examples together.
Authenticate with npm interactively; never put tokens in this repository. Then:

```bash
npm whoami
npm test
npm run validate
npm run test:package
npm pack --dry-run
npm publish --access restricted
```

`prepublishOnly` repeats verification before publication. Record the published version and tag the
exact tested commit only after confirming success. A decision to distribute publicly requires owner
approval and a licensing decision; do not change visibility as a workaround for access errors.

Once that release exists and the user has registry access:

```bash
npm install -g @manh0303/ai-harness@0.3.0
aih --version
cd /path/to/existing-project
aih update --dry-run
aih update
aih check
```

Updating the global tool does not rewrite any consumer automatically. Review and commit each project's
snapshot/lock changes on a branch. The CLI has no self-update or remote release lookup.
