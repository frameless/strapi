import pluginPkg from '../../package.json';

export const pluginId = pluginPkg.name.replace(/^@frameless\/(@[^-,.][\w,-]+\/|strapi-)plugin-/i, '');
