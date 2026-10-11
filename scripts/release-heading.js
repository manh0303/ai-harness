// Shared check for human-authored and Release Please-generated CHANGELOG headings.
export function hasReleaseHeading(markdown, version) {
  const escaped = version.replace(/[.*+?^$\{\}()|[\]\\]/g, '\\$&');
  const heading = new RegExp(
    '^##\\s+(?:\\[v?' + escaped + '\\](?:\\([^\\n]*\\))?|v?' + escaped + ')(?=\\s|$|—)',
    'm'
  );
  return heading.test(markdown);
}
