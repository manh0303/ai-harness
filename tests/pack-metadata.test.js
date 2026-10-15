import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePackMetadata } from '../scripts/pack-metadata.js';

const name = '@manhd_d/notth';
const entry = { name, version: '0.6.0', filename: 'manhd_d-notth-0.6.0.tgz', files: [{ path: 'bin/aih.js' }] };

test('npm 10/11 array-shaped pack metadata', () => {
  assert.deepEqual(parsePackMetadata(JSON.stringify([entry]), name), entry);
});

test('npm 12 package-name keyed pack metadata', () => {
  assert.deepEqual(parsePackMetadata(JSON.stringify({ [name]: entry }), name), entry);
});

test('reject missing or inconsistent npm pack metadata', () => {
  for (const result of [
    '[]', '{}', JSON.stringify({ other: entry }),
    JSON.stringify([{ ...entry, name: 'wrong' }]),
    JSON.stringify([{ ...entry, files: undefined }]),
    JSON.stringify([entry, entry])
  ]) {
    assert.throws(() => parsePackMetadata(result, name), /Unexpected npm pack --json metadata/);
  }
  assert.throws(() => parsePackMetadata('not-json', name), /valid JSON/);
});
