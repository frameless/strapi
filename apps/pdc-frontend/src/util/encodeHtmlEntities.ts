/**
 * Encodes HTML entities in a given string to their corresponding HTML escape sequences.
 * Also replaces non-character ranges and control characters with the replacement character (U+FFFD).
 *
 * @param {string} text - The input string to encode.
 * @returns {string} - The encoded string with HTML entities replaced.
 */
export const encodeHtmlEntities = (text: string): string => {
  const QUOTATION_MARK = 0x0022;
  const AMPERSAND = 0x0026;
  const LESS_THAN_SIGN = 0x003c;
  const GREATER_THAN_SIGN = 0x003e;
  const SPACE = 0x0020;
  const NONCHARACTER_FFFE = 0xfffe;
  const NONCHARACTER_FFFF = 0xffff;

  const escapeChar = (char: string): string => {
    const code = char.codePointAt(0)!;

    if (code === QUOTATION_MARK) return '&quot;';
    if (code === AMPERSAND) return '&amp;';
    if (code === LESS_THAN_SIGN) return '&lt;';
    if (code === GREATER_THAN_SIGN) return '&gt;';
    if (code < SPACE || code === NONCHARACTER_FFFE || code === NONCHARACTER_FFFF) {
      return '\uFFFD';
    }

    return char;
  };

  return [...text].map(escapeChar).join('');
};
