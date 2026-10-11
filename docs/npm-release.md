# npm installation and release

The public npm package is `@manhd_d/ai-harness` (executable: `aih`). The private GitHub repository stays `manh0303/ai-harness`. Different npm and GitHub usernames are expected.

**Changing this configuration and merging a PR does not publish a package.** Public npm publication makes every file inside the npm tarball publicly accessible, regardless of GitHub repository visibility.

## First publication: manual, maintainer-controlled

1. Confirm the verified npm account is `manhd_d`, with 2FA enabled, and the publishing machine uses the official npm registry.
2. Merge the reviewed PR. Check out the approved `main` commit. Review `npm pack --dry-run` for secrets before sharing the archive.
3. Run:

```bash
git switch main
git pull --ff-only
npm login
npm whoami
npm config get registry
npm ci --ignore-scripts --no-audit --no-fund
npm test
npm run validate
npm run check:release
npm run test:package
npm pack --dry-run
npm publish --access public
npm view @manhd_d/ai-harness version
```

`npm whoami` must return `manhd_d`. The expected first package version is `0.6.0`, if the maintainer has approved that release and the version is not already published. Publishing may require browser/2FA confirmation. Never commit npm credentials or tokens.

A successful publish is independently verifiable with `npm view`. You can add an annotated git tag `v0.6.0` to the exact commit afterwards, but **do not create/publish a GitHub Release for a version already published manually**.

## Later releases: npm Trusted Publishing via GitHub Actions

After the first successful manual publication, go to [npm](https://www.npmjs.com) → package `@manhd_d/ai-harness` → Settings → Trusted publishing and configure a GitHub Actions publisher:

| Field | Value |
| --- | --- |
| GitHub user/organization | `manh0303` |
| Repository | `ai-harness` |
| Workflow file | `npm-publish.yml` |
| Environment | Leave empty (workflow does not use an environment) |

Select direct **npm publish** permissions if npm offers a stage-only option. Configure the trusted publisher shortly before the next release if npm applies an initial activation deadline. No long-lived `NPM_TOKEN` is required.

For each subsequent version: use a dedicated release PR to update `package.json`, `package-lock.json`, `harness.yaml` and `CHANGELOG.md` together, run CI, review and merge. Create a tag `vX.Y.Z` at the tested main commit and **publish the corresponding GitHub Release**. Only this Release publication triggers `.github/workflows/npm-publish.yml`. The workflow checks that the commit is reachable from main, that the tag matches the package version, and that tests and tarball smoke checks pass before attempting OIDC-based publication.

A private GitHub source repository does not support npm provenance attestation even though the public package can use OIDC. Do not enable npm provenance for this private repository. See [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/).

## Local installation before npm publication

```bash
npm pack
npm install -g ./manhd_d-ai-harness-0.6.0.tgz
aih --version
```

## Installation after verified npm publication

```bash
npm install -g @manhd_d/ai-harness
aih --version
cd /path/to/existing-project
aih init --adapters java-spring
aih check
```

Existing consumers can update the CLI with `npm update -g @manhd_d/ai-harness`. Use `aih update --dry-run`, `aih update`, `aih check` to update a consumer project's snapshot on a branch. CLI installation does not install OpenSpec, an AI runtime or application dependencies.

Read [Getting started](getting-started.md) and [Release policy](release-policy.md).
