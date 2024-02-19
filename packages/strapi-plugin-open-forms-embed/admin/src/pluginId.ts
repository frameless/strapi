import pluginPkg from '../../package.json';

const pluginId = pluginPkg.name.replace(/^@frameless\/(@[^-,.][\w,-]+\/|strapi-)plugin-/i, '');

export default pluginId;
