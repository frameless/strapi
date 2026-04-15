const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const fnv1a32 = (str: string): number =>
  [...str].reduce(
    // Multiply by FNV prime (0x01000193), keep to 32 bits
    (hash, char) => ((hash ^ char.charCodeAt(0)) * 0x01000193) >>> 0,
    0x811c9dc5,
  );

/**
 * Derives a stable numeric index from either a UUID or a Strapi 5 documentId.
 *
 * - Valid UUID  → first 8 hex chars parsed as a hex integer (original behaviour)
 * - Strapi documentId / any other string → FNV-1a 32-bit hash
 *
 * Both paths produce a consistent positive integer ≤ 4,294,967,295 for the
 * same input, so switching from uuid to documentId at a call site is safe as
 * long as you're consistent — don't mix the two for the same record type.
 */

export const uuidToIndex = (id: string | null | undefined): number => {
  if (!id) throw new Error('uuidToIndex: id is required');
  return UUID_RE.test(id) ? parseInt(id.replace(/-/g, '').slice(0, 8), 16) : fnv1a32(id);
};
