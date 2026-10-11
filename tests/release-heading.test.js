import test from 'node:test';
import assert from 'node:assert/strict';
import { hasReleaseHeading } from '../scripts/release-heading.js';

test('recognizes Release Please linked and traditional changelog headings', () => {
  assert.equal(hasReleaseHeading('## [0.6.1](https://example.com/v0.6.1) (2026-10-11)', '0.6.1'), true);
  assert.equal(hasReleaseHeading('## [v0.6.1](https://example.com/v0.6.1)', '0.6.1'), true);
  assert.equal(hasReleaseHeading('## 0.6.0 — Initial release', '0.6.0'), true);
  assert.equal(hasReleaseHeading('## v0.7.0 (2026-11-01)', '0.7.0'), true);
  assert.equal(hasReleaseHeading('## [0.6.1]', '0.6.1'), true);
});

test('rejects near-miss versions, body mentions, and subsection headings', () => {
  for (const changelog of ['## 0.6.10', '## 0.6.1-rc.1', '### 0.6.1',
    '## Unreleased — mentions 0.6.1', 'body 0.6.1', '## [0.6.1-extra](https://example.com)']) {
    assert.equal(hasReleaseHeading(changelog, '0.6.1'), false, changelog);
  }
});
