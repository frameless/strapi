/**
 * Extracts the UID from a given URL by removing the trailing numeric segment.
 *
 * @param {string} href - The URL from which to extract the UID.
 * @returns {string} The URL without the trailing numeric segment.
 */
export const getUIDFromHref = (/** @type {string} */ href) => href?.replace(/\/\d+$/, '');
