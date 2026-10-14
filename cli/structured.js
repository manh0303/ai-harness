import { HarnessError, isObject } from './files.js';

// Deliberately bounded YAML subset: mappings, sequences, JSON inline values and scalars.
// No tags, anchors, aliases, block scalars, implicit dates or object construction.
export function parseStructured(text, label = 'structured data') {
  const fail = () => { throw new HarnessError('Invalid or unsupported YAML: ' + label); };
  if (text.length > 65536) fail();
  const clean = text.trim();
  if (clean.startsWith('{')) {
    try { const value = JSON.parse(clean); if (!isObject(value)) fail(); return value; }
    catch { fail(); }
  }
  const lines = text.split(/\r?\n/).filter(l => l.trim() && !l.trim().startsWith('#'));
  if (lines.some(l => /\t/.test(l))) fail();
  const indent = l => l.length - l.trimStart().length;
  const scalar = s => {
    if (!s || /^[!&*|>]/.test(s)) fail();
    if (s.startsWith('"') || s.startsWith('[') || s.startsWith('{')) {
      try { return JSON.parse(s); } catch { fail(); }
    }
    if (s.startsWith("'")) { if (!s.endsWith("'")) fail(); return s.slice(1, -1).replaceAll("''", "'"); }
    if (s === 'true') return true;
    if (s === 'false') return false;
    if (s === 'null') return null;
    if (/^-?(?:0|[1-9]\d*)(?:\.\d+)?$/.test(s)) return Number(s);
    return s;
  };
  let index = 0;
  function block(depth, level = 0) {
    if (level > 12 || index >= lines.length || indent(lines[index]) !== depth) fail();
    const array = lines[index].trimStart().startsWith('- '), result = array ? [] : {};
    function pair(line, object, keyDepth) {
      const match = /^([A-Za-z_][A-Za-z0-9_-]*):(?:\s+(.*))?$/.exec(line);
      if (!match || ['__proto__', 'constructor', 'prototype'].includes(match[1]) || Object.hasOwn(object, match[1])) fail();
      const value = match[2];
      object[match[1]] = value !== undefined ? scalar(value.trim())
        : index < lines.length && indent(lines[index]) > keyDepth ? block(indent(lines[index]), level + 1) : null;
    }
    while (index < lines.length && indent(lines[index]) >= depth) {
      if (indent(lines[index]) !== depth) fail();
      const line = lines[index++].trimStart();
      if (array) {
        if (!line.startsWith('- ')) fail();
        const value = line.slice(2);
        if (/^[A-Za-z_][A-Za-z0-9_-]*:(?:\s|$)/.test(value)) {
          const item = {}; pair(value, item, depth + 2);
          while (index < lines.length && indent(lines[index]) === depth + 2) pair(lines[index++].trimStart(), item, depth + 2);
          result.push(item);
        } else result.push(scalar(value));
      } else pair(line, result, depth);
    }
    return result;
  }
  if (!lines.length) return {};
  const value = block(0);
  if (!isObject(value) || index !== lines.length) fail();
  return value;
}

export function frontmatter(body, label) {
  if (!body.startsWith('---\n') && !body.startsWith('---\r\n')) return null;
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(body);
  if (!match) throw new HarnessError('Incomplete frontmatter: ' + label);
  return { raw: match[1], value: parseStructured(match[1], label) };
}
