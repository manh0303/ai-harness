import fs from 'node:fs';
import { safe, stat, HarnessError } from './files.js';

// Shared project-owned JSON reader. Never echo malformed input or secret values.
export function readConfig(root, name) {
  const p = safe(root, name), info = stat(p);
  if (!info) return null;
  if (info.size > 1024 * 1024) throw new HarnessError('Configuration exceeds 1 MiB: ' + name);
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { throw new HarnessError('Invalid JSON: ' + name); }
}
