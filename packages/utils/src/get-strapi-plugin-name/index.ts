/**
 * @param {string} name - The name of the plugin
 * @returns {string} The name of the plugin without the prefix
 * @example
 * getStrapiPluginName('@frameless/strapi-plugin-preview-button') // 'preview-button'
 *
 * */

export const getStrapiPluginName = (name: string): string =>
  name && name.replace(/^@frameless\/(@[^-,.][\w,-]+\/|strapi-)plugin-/i, '');
