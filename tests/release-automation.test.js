import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const json = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const text = file => fs.readFileSync(path.join(root, file), 'utf8');

test('release-please bootstraps the already published v0.6.0', () => {
  const config = json('release-please-config.json');
  const releases = json('.release-please-manifest.json');
  const pkg = json('package.json');
  assert.match(config['bootstrap-sha'], /^[a-f0-9]{40}$/);
  assert.equal(releases['.'], pkg.version);
  assert.equal(config['include-v-in-tag'], true);
  assert.equal(config['include-component-in-tag'], false);
  assert.equal(config.packages['.']['release-type'], 'node');
  assert.equal(config.packages['.']['package-name'], '@manhd_d/ai-harness');
  assert.deepEqual(config.packages['.']['extra-files'], [
    {type: 'json', path: 'harness.yaml', jsonpath: '$.version'}
  ]);
  assert.equal(json('harness.yaml').version, pkg.version);
  assert.equal(json('package-lock.json').version, pkg.version);
});

test('publishing stays in the npm-trusted workflow, requiring release review and OIDC', () => {
  const workflow = text('.github/workflows/npm-publish.yml');
  assert.match(workflow, /googleapis\/release-please-action@v4/);
  assert.match(workflow, /github\.event_name == 'push'/);
  assert.match(workflow, /release_created == 'true'/);
  assert.match(workflow, /github\.event_name == 'release'/);
  assert.match(workflow, /id-token: write/);
  assert.match(workflow, /npm publish --access public/);
  assert.match(workflow, /git merge-base --is-ancestor HEAD origin\/main/);
  assert.doesNotMatch(workflow, /NODE_AUTH_TOKEN:|NPM_TOKEN:/);
  assert.match(text('.github/workflows/harness.yml'), /workflow_dispatch:/);
});
