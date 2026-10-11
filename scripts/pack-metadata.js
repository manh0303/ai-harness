/** Normalize npm pack --json across npm 10/11 (array) and npm 12 (name-keyed object). */
export function parsePackMetadata(stdout, packageName) {
  let parsed;
  try {
    parsed = JSON.parse(stdout);
  } catch (error) {
    throw new Error(`npm pack --json did not return valid JSON for ${packageName}`, { cause: error });
  }
  const packed = Array.isArray(parsed)
    ? (parsed.length === 1 ? parsed[0] : undefined)
    : (parsed && typeof parsed === 'object' ? parsed[packageName] : undefined);
  if (!packed || packed.name !== packageName || typeof packed.filename !== 'string' ||
    packed.filename.length === 0 || !Array.isArray(packed.files) ||
    packed.files.some(file => !file || typeof file.path !== 'string')) {
    throw new Error(`Unexpected npm pack --json metadata for ${packageName}; expected one package containing name, filename and files`);
  }
  return packed;
}
